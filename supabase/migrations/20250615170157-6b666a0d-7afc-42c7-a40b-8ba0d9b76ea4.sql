
-- Add email column to profiles table
ALTER TABLE public.profiles ADD COLUMN email TEXT;

-- Update the handle_new_user function to store the real email
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE
  referrer_user_id UUID;
BEGIN
  -- Insert a new profile with default credits and real email
  INSERT INTO public.profiles (id, email, first_name, last_name, whatsapp_number, referrer_whatsapp, remaining_credits, used_credits)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'email', -- Store real email from metadata
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'whatsapp_number',
    new.raw_user_meta_data ->> 'referrer_whatsapp',
    3, -- New users start with 3 credits
    0
  );
  
  -- Grant referral credits if a referrer is provided
  IF new.raw_user_meta_data ->> 'referrer_whatsapp' IS NOT NULL THEN
    SELECT p.id INTO referrer_user_id
    FROM public.profiles p
    WHERE p.whatsapp_number = new.raw_user_meta_data ->> 'referrer_whatsapp'
    LIMIT 1;
    
    IF referrer_user_id IS NOT NULL THEN
      UPDATE public.profiles
      SET remaining_credits = remaining_credits + 50,
          updated_at = now()
      WHERE id = referrer_user_id;
    END IF;
  END IF;
  
  RETURN new;
END;
$function$
