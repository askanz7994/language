
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [referrerWhatsapp, setReferrerWhatsapp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Signed in successfully!');
        }
      } else {
        if (referrerWhatsapp && referrerWhatsapp.trim()) {
          const { data, error: functionError } = await supabase.functions.invoke('validate-referrer', {
            body: { whatsappNumber: referrerWhatsapp.trim() },
          });

          if (functionError) {
            console.error('Error validating referrer:', functionError.message);
            toast.error('Could not validate referrer number. Please try again.');
            setIsLoading(false);
            return;
          }

          if (!data.isValid) {
            toast.error('The referrer WhatsApp number is not valid.');
            setIsLoading(false);
            return;
          }
        }

        const trimmedWhatsapp = whatsappNumber.trim();
        if (!trimmedWhatsapp) {
          toast.error('WhatsApp Number is a required field.');
          setIsLoading(false);
          return;
        }

        // Validate if WhatsApp number is already in use
        const { data: uniquenessData, error: uniquenessError } = await supabase.functions.invoke('validate-whatsapp-uniqueness', {
          body: { whatsappNumber: trimmedWhatsapp },
        });

        if (uniquenessError || (uniquenessData && !uniquenessData.isUnique)) {
          if (uniquenessError) {
            console.error('Error validating WhatsApp number:', uniquenessError.message);
          }
          toast.error('WhatsApp number already used.');
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              first_name: firstName.trim(),
              last_name: lastName.trim(),
              whatsapp_number: trimmedWhatsapp,
              referrer_whatsapp: referrerWhatsapp.trim(),
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created successfully! Welcome!');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFormType = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setWhatsappNumber('');
    setReferrerWhatsapp('');
  };

  return {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    whatsappNumber,
    setWhatsappNumber,
    referrerWhatsapp,
    setReferrerWhatsapp,
    isLoading,
    handleSubmit,
    toggleFormType,
  };
};
