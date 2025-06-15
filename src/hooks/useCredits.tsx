import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CreditDetails {
  total_credits: number;
  valid_credits: number;
  next_expiry: string | null;
}

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [creditDetails, setCreditDetails] = useState<CreditDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setCreditDetails(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Get credit details
      const { data: details, error: detailsError } = await supabase.rpc('get_user_credit_details');
      
      if (detailsError) {
        console.error('Error fetching credit details:', detailsError);
        setCredits(0);
        setCreditDetails(null);
      } else if (details && details.length > 0) {
        const creditInfo = details[0];
        setCreditDetails(creditInfo);
        setCredits(creditInfo.valid_credits || 0);
      } else {
        setCredits(0);
        setCreditDetails(null);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
      setCredits(0);
      setCreditDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const useCredit = async (): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('use_user_credit');
      if (error) {
        console.error('Error using credit:', error);
        return false;
      }
      
      if (data) {
        await fetchCredits(); // Refresh credits
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error using credit:', error);
      return false;
    }
  };

  // Keep the old decreaseCredits function for backward compatibility
  const decreaseCredits = async (amount: number = 1): Promise<boolean> => {
    console.warn('decreaseCredits is deprecated, use useCredit instead');
    return useCredit();
  };

  useEffect(() => {
    if (user) {
      fetchCredits();
    }
  }, [user]);

  return {
    credits,
    creditDetails,
    loading,
    fetchCredits,
    useCredit,
    decreaseCredits, // Keep for backward compatibility
  };
};
