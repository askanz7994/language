
-- Add 'remaining_credits' and 'used_credits' columns to the profiles table
ALTER TABLE public.profiles ADD COLUMN remaining_credits INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN used_credits INTEGER NOT NULL DEFAULT 0;

-- Migrate existing credit counts from 'user_credits' to 'profiles'
-- This will set 'remaining_credits' to the current credit count for each user.
UPDATE public.profiles p
SET remaining_credits = uc.credits
FROM public.user_credits uc
WHERE p.id = uc.user_id;

-- Remove old functions that depend on the 'user_credits' table
DROP FUNCTION IF EXISTS public.get_user_credit_details();
DROP FUNCTION IF EXISTS public.use_user_credit();
DROP FUNCTION IF EXISTS public.add_user_credits(integer);
DROP FUNCTION IF EXISTS public.get_user_credits();
DROP FUNCTION IF EXISTS public.migrate_existing_credits();
DROP FUNCTION IF EXISTS public.decrease_user_credits(integer);

-- Remove the now-unused 'user_credits' table
DROP TABLE public.user_credits;

-- Update the handle_new_user function to work with the new credit system
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  referrer_user_id UUID;
BEGIN
  -- Insert a new profile with default credits
  INSERT INTO public.profiles (id, first_name, last_name, whatsapp_number, referrer_whatsapp, remaining_credits, used_credits)
  VALUES (
    new.id, 
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
$$;

-- New function to get a user's remaining credits
CREATE OR REPLACE FUNCTION public.get_user_credits()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_credits INTEGER;
BEGIN
  SELECT remaining_credits INTO user_credits
  FROM public.profiles
  WHERE id = auth.uid();
  
  RETURN COALESCE(user_credits, 0);
END;
$$;

-- New function to use a credit
CREATE OR REPLACE FUNCTION public.use_user_credit()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  SELECT remaining_credits INTO current_credits
  FROM public.profiles
  WHERE id = auth.uid();
  
  IF current_credits >= 1 THEN
    UPDATE public.profiles
    SET remaining_credits = remaining_credits - 1,
        used_credits = used_credits + 1,
        updated_at = now()
    WHERE id = auth.uid();
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;

-- New function to add credits to a user's profile
CREATE OR REPLACE FUNCTION public.add_user_credits(amount INTEGER DEFAULT 1)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET remaining_credits = remaining_credits + amount,
      updated_at = now()
  WHERE id = auth.uid();
  
  RETURN TRUE;
END;
$$;

-- New function to get detailed credit information
CREATE OR REPLACE FUNCTION public.get_user_credit_details()
RETURNS TABLE(total_credits integer, valid_credits integer, next_expiry timestamp with time zone)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.remaining_credits + p.used_credits as total_credits,
    p.remaining_credits as valid_credits,
    NULL::timestamp with time zone as next_expiry
  FROM public.profiles p
  WHERE p.id = auth.uid();
END;
$$;

