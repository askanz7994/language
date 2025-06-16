
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

  const { user, signIn, signUp } = useAuth();
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
        console.log('=== LOGIN ATTEMPT ===');
        console.log('Input WhatsApp number:', whatsappNumber);
        console.log('Trimmed WhatsApp number:', whatsappNumber.trim());
        
        // For login, we need to find the user's real email from their WhatsApp number
        console.log('Querying profiles table for WhatsApp number...');
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email, whatsapp_number, first_name, last_name')
          .eq('whatsapp_number', whatsappNumber.trim())
          .maybeSingle();

        console.log('Profile query result:', { profileData, profileError });
        console.log('Profile data type:', typeof profileData);
        console.log('Profile data exists:', !!profileData);

        if (profileError) {
          console.error('Error finding user profile:', profileError);
          toast.error('Error looking up user account. Please try again.');
          setIsLoading(false);
          return;
        }

        if (!profileData) {
          console.log('No profile data found for WhatsApp number:', whatsappNumber.trim());
          
          // Let's also check what profiles exist in the database
          const { data: allProfiles, error: allProfilesError } = await supabase
            .from('profiles')
            .select('whatsapp_number, email, first_name, last_name')
            .limit(10);
          
          console.log('All profiles sample:', allProfiles);
          console.log('All profiles error:', allProfilesError);
          
          toast.error('No account found with this WhatsApp number.');
          setIsLoading(false);
          return;
        }

        if (!profileData.email) {
          console.log('Profile found but no email:', profileData);
          toast.error('Account found but email is missing. Please contact support.');
          setIsLoading(false);
          return;
        }

        console.log('Found profile email:', profileData.email);
        console.log('Attempting to sign in with email:', profileData.email);
        
        // Use the real email for login
        await signIn(profileData.email, password);
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

          if (typeof data?.isValid !== 'boolean') {
            console.error('Unexpected response from validate-referrer:', data);
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

        if (uniquenessError) {
          console.error('Error validating WhatsApp number:', uniquenessError.message);
          toast.error('Could not validate WhatsApp number. Please try again.');
          setIsLoading(false);
          return;
        }
        
        if (typeof uniquenessData?.isUnique !== 'boolean') {
            console.error('Unexpected response from validate-whatsapp-uniqueness:', uniquenessData);
            toast.error('Could not validate WhatsApp number. Please try again.');
            setIsLoading(false);
            return;
        }

        if (!uniquenessData.isUnique) {
          toast.error('WhatsApp number already used.');
          setIsLoading(false);
          return;
        }

        await signUp(
          email.trim(),
          password,
          firstName.trim(),
          lastName.trim(),
          trimmedWhatsapp,
          referrerWhatsapp.trim()
        );
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
