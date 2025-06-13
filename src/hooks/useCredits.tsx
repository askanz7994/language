
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCredits = async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_credits');
      if (error) {
        console.error('Error fetching credits:', error);
        setCredits(0);
      } else {
        setCredits(data || 0);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
      setCredits(0);
    } finally {
      setLoading(false);
    }
  };

  const decreaseCredits = async (amount: number = 1): Promise<boolean> => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc('decrease_user_credits', { amount });
      if (error) {
        console.error('Error decreasing credits:', error);
        return false;
      }
      
      if (data) {
        await fetchCredits(); // Refresh credits
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error decreasing credits:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchCredits();
  }, [user]);

  return {
    credits,
    loading,
    fetchCredits,
    decreaseCredits
  };
};
