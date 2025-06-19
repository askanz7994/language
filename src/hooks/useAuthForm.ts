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
        console.log('=== COMPREHENSIVE LOGIN DEBUG ===');
        console.log('Input WhatsApp number:', whatsappNumber);
        console.log('Trimmed WhatsApp number:', whatsappNumber.trim());
        
        // Step 1: Check profiles table
        console.log('1. Querying profiles table for WhatsApp number...');
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email, whatsapp_number, first_name, last_name, id')
          .eq('whatsapp_number', whatsappNumber.trim())
          .maybeSingle();

        console.log('Profiles table query result:', { profileData, profileError });

        // Step 2: Get ALL profiles to see what's in the database
        console.log('2. Getting all profiles to debug...');
        const { data: allProfiles, error: allProfilesError } = await supabase
          .from('profiles')
          .select('whatsapp_number, email, first_name, last_name, id')
          .limit(20);
        
        console.log('All profiles in database:', allProfiles);
        console.log('All profiles error:', allProfilesError);

        // Step 3: Check if we can access auth.users metadata (this might not work due to RLS)
        console.log('3. Attempting to check auth users...');
        try {
          const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
          console.log('Auth users (if accessible):', authUsers);
          console.log('Auth users error:', authError);
        } catch (e) {
          console.log('Cannot access auth.users directly (expected):', e);
        }

        // Step 4: Try to find user by different WhatsApp number variations
        console.log('4. Trying different WhatsApp number variations...');
        const variations = [
          whatsappNumber.trim(),
          whatsappNumber.trim().replace(/\s+/g, ''),
          whatsappNumber.trim().replace(/[^\d]/g, ''),
          '+' + whatsappNumber.trim().replace(/[^\d]/g, ''),
        ];

        console.log('Testing variations:', variations);

        let foundProfile = null;
        for (const variation of variations) {
          const { data: varProfile } = await supabase
            .from('profiles')
            .select('email, whatsapp_number, first_name, last_name, id')
            .eq('whatsapp_number', variation)
            .maybeSingle();
          
          if (varProfile) {
            console.log(`Found profile with variation "${variation}":`, varProfile);
            foundProfile = varProfile;
            break;
          }
        }

        // Step 5: Check for partial matches
        console.log('5. Checking for partial matches...');
        const { data: partialMatches } = await supabase
          .from('profiles')
          .select('email, whatsapp_number, first_name, last_name, id')
          .ilike('whatsapp_number', `%${whatsappNumber.trim().replace(/[^\d]/g, '')}%`);
        
        console.log('Partial matches:', partialMatches);

        // Now try to proceed with login
        const finalProfile = foundProfile || profileData;
        
        if (profileError) {
          console.error('Error querying profiles:', profileError);
          toast.error('Error looking up user account. Please try again.');
          setIsLoading(false);
          return;
        }

        if (!finalProfile) {
          console.log('=== NO PROFILE FOUND ===');
          console.log('Searched for:', whatsappNumber.trim());
          console.log('Available WhatsApp numbers in database:', allProfiles?.map(p => p.whatsapp_number));
          toast.error('No account found with this WhatsApp number. Please check the number or sign up.');
          setIsLoading(false);
          return;
        }

        if (!finalProfile.email) {
          console.log('Profile found but no email:', finalProfile);
          toast.error('Account found but email is missing. Please contact support.');
          setIsLoading(false);
          return;
        }

        console.log('=== PROCEEDING WITH LOGIN ===');
        console.log('Found profile email:', finalProfile.email);
        console.log('Complete profile data:', finalProfile);
        
        // Use the real email for login
        await signIn(finalProfile.email, password);
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
