
-- Add expiration tracking to user_credits table
ALTER TABLE public.user_credits 
ADD COLUMN IF NOT EXISTS credits_data JSONB DEFAULT '[]'::jsonb;

-- Create function to get valid (non-expired) credits count
CREATE OR REPLACE FUNCTION public.get_user_credits()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  valid_credits INTEGER;
BEGIN
  -- Count non-expired credits
  SELECT COALESCE(
    jsonb_array_length(
      (SELECT jsonb_agg(credit)
       FROM jsonb_array_elements(COALESCE(credits_data, '[]'::jsonb)) AS credit
       WHERE (credit->>'expires_at')::timestamp with time zone > now())
    ), 0
  ) INTO valid_credits
  FROM public.user_credits
  WHERE user_id = auth.uid();
  
  RETURN COALESCE(valid_credits, 0);
END;
$$;

-- Create function to use a credit (remove oldest valid credit)
CREATE OR REPLACE FUNCTION public.use_user_credit()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits_data JSONB;
  valid_credits JSONB;
  updated_credits JSONB;
BEGIN
  -- Get current credits data
  SELECT COALESCE(credits_data, '[]'::jsonb) INTO current_credits_data
  FROM public.user_credits
  WHERE user_id = auth.uid();
  
  -- Filter valid (non-expired) credits and sort by creation time
  SELECT jsonb_agg(credit ORDER BY (credit->>'created_at')::timestamp)
  INTO valid_credits
  FROM jsonb_array_elements(current_credits_data) AS credit
  WHERE (credit->>'expires_at')::timestamp with time zone > now();
  
  -- Check if we have valid credits
  IF valid_credits IS NULL OR jsonb_array_length(valid_credits) = 0 THEN
    RETURN FALSE;
  END IF;
  
  -- Remove the oldest credit (first in sorted array)
  SELECT jsonb_agg(credit)
  INTO updated_credits
  FROM (
    SELECT credit, row_number() OVER() as rn
    FROM jsonb_array_elements(valid_credits) AS credit
  ) numbered_credits
  WHERE rn > 1;
  
  -- Update credits data (remove expired credits and the used one)
  UPDATE public.user_credits
  SET credits_data = COALESCE(updated_credits, '[]'::jsonb),
      credits = COALESCE(jsonb_array_length(updated_credits), 0),
      updated_at = now()
  WHERE user_id = auth.uid();
  
  RETURN TRUE;
END;
$$;

-- Create function to add credits with expiration
CREATE OR REPLACE FUNCTION public.add_user_credits(amount INTEGER DEFAULT 1)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits_data JSONB;
  new_credits JSONB;
  updated_credits_data JSONB;
  user_exists BOOLEAN;
BEGIN
  -- Check if user already has a record
  SELECT EXISTS(SELECT 1 FROM public.user_credits WHERE user_id = auth.uid()) INTO user_exists;
  
  -- Get current credits data, filtering out expired ones
  IF user_exists THEN
    WITH valid_credits AS (
      SELECT credit
      FROM public.user_credits uc,
           jsonb_array_elements(COALESCE(uc.credits_data, '[]'::jsonb)) AS credit
      WHERE uc.user_id = auth.uid()
        AND (credit->>'expires_at')::timestamp with time zone > now()
    )
    SELECT COALESCE(jsonb_agg(credit), '[]'::jsonb)
    INTO current_credits_data
    FROM valid_credits;
  ELSE
    current_credits_data := '[]'::jsonb;
  END IF;
  
  -- Create new credits with 5-minute expiration
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', gen_random_uuid(),
      'created_at', now(),
      'expires_at', now() + interval '5 minutes'
    )
  ) INTO new_credits
  FROM generate_series(1, amount);
  
  -- Combine existing valid credits with new credits
  updated_credits_data := COALESCE(current_credits_data, '[]'::jsonb) || COALESCE(new_credits, '[]'::jsonb);
  
  -- Insert or update user credits
  INSERT INTO public.user_credits (user_id, credits, credits_data)
  VALUES (auth.uid(), jsonb_array_length(updated_credits_data), updated_credits_data)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    credits = jsonb_array_length(updated_credits_data),
    credits_data = updated_credits_data,
    updated_at = now();
  
  RETURN TRUE;
END;
$$;

-- Create function to migrate existing credits to the new system
CREATE OR REPLACE FUNCTION public.migrate_existing_credits()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  rec RECORD;
  credits_array JSONB;
BEGIN
  -- Loop through all users with credits > 0 and empty credits_data
  FOR rec IN 
    SELECT user_id, credits 
    FROM public.user_credits 
    WHERE credits > 0 AND (credits_data IS NULL OR credits_data = '[]'::jsonb)
  LOOP
    -- Create credits array for this user
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', gen_random_uuid(),
        'created_at', now(),
        'expires_at', now() + interval '5 minutes'
      )
    ) INTO credits_array
    FROM generate_series(1, rec.credits);
    
    -- Update the user's credits_data
    UPDATE public.user_credits 
    SET credits_data = credits_array
    WHERE user_id = rec.user_id;
  END LOOP;
END;
$$;

-- Run the migration for existing credits
SELECT public.migrate_existing_credits();

-- Update the handle_new_user function to use the new credit system
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  referrer_user_id UUID;
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, first_name, last_name, whatsapp_number, referrer_whatsapp)
  VALUES (
    new.id, 
    new.raw_user_meta_data ->> 'first_name', 
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'whatsapp_number',
    new.raw_user_meta_data ->> 'referrer_whatsapp'
  );
  
  -- Add default credits (3) for new user using the new function
  INSERT INTO public.user_credits (user_id, credits, credits_data)
  VALUES (
    new.id, 
    3, 
    (SELECT jsonb_agg(
      jsonb_build_object(
        'id', gen_random_uuid(),
        'created_at', now(),
        'expires_at', now() + interval '5 minutes'
      )
    ) FROM generate_series(1, 3))
  );
  
  -- If there's a referrer, give them 50 bonus credits
  IF new.raw_user_meta_data ->> 'referrer_whatsapp' IS NOT NULL THEN
    -- Find the referrer user by whatsapp number
    SELECT p.id INTO referrer_user_id
    FROM public.profiles p
    WHERE p.whatsapp_number = new.raw_user_meta_data ->> 'referrer_whatsapp'
    LIMIT 1;
    
    -- If referrer found, add 50 credits
    IF referrer_user_id IS NOT NULL THEN
      PERFORM public.add_user_credits(50);
    END IF;
  END IF;
  
  RETURN new;
END;
$$;

-- Create function to get credit details with expiration times
CREATE OR REPLACE FUNCTION public.get_user_credit_details()
RETURNS TABLE(
  total_credits INTEGER,
  valid_credits INTEGER,
  next_expiry TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(jsonb_array_length(uc.credits_data), 0) as total_credits,
    COALESCE(
      (SELECT jsonb_array_length(jsonb_agg(credit))
       FROM jsonb_array_elements(COALESCE(uc.credits_data, '[]'::jsonb)) AS credit
       WHERE (credit->>'expires_at')::timestamp with time zone > now()), 0
    ) as valid_credits,
    (SELECT MIN((credit->>'expires_at')::timestamp with time zone)
     FROM jsonb_array_elements(COALESCE(uc.credits_data, '[]'::jsonb)) AS credit
     WHERE (credit->>'expires_at')::timestamp with time zone > now()
    ) as next_expiry
  FROM public.user_credits uc
  WHERE uc.user_id = auth.uid();
END;
$$;

-- Update the decrease_user_credits function to use the new system
DROP FUNCTION IF EXISTS public.decrease_user_credits(INTEGER);
