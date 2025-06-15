
import { useState, useEffect, useCallback } from 'react';
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

  const fetchCredits = useCallback(async (options: { showLoader?: boolean } = {}) => {
    const { showLoader = true } = options;

    if (!user) {
      setCredits(0);
      setCreditDetails(null);
      setLoading(false);
      return;
    }

    if (showLoader) {
      setLoading(true);
    }
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
      if (showLoader) {
        setLoading(false);
      }
    }
  }, [user]);

  const useCredit = useCallback(async (options: { silent?: boolean } = {}): Promise<boolean> => {
    const { silent = false } = options;
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('use_user_credit');
      if (error) {
        console.error('Error using credit:', error);
        return false;
      }
      
      if (data) {
        await fetchCredits({ showLoader: !silent }); // Refresh credits
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error using credit:', error);
      return false;
    }
  }, [user, fetchCredits]);

  // Keep the old decreaseCredits function for backward compatibility
  const decreaseCredits = useCallback(async (amount: number = 1): Promise<boolean> => {
    console.warn('decreaseCredits is deprecated, use useCredit instead');
    return useCredit();
  }, [useCredit]);

  useEffect(() => {
    if (user) {
      fetchCredits({ showLoader: true });
    }
  }, [user, fetchCredits]);

  return {
    credits,
    creditDetails,
    loading,
    fetchCredits,
    useCredit,
    decreaseCredits, // Keep for backward compatibility
  };
};
