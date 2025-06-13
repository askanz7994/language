
-- Add whatsapp_number and referrer_whatsapp to profiles table
ALTER TABLE public.profiles 
ADD COLUMN whatsapp_number TEXT,
ADD COLUMN referrer_whatsapp TEXT;

-- Create credits table
CREATE TABLE public.user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  credits INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on user_credits table
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_credits
CREATE POLICY "Users can view their own credits" 
  ON public.user_credits 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits" 
  ON public.user_credits 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to handle new user registration with credits
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
  
  -- Insert default credits (3) for new user
  INSERT INTO public.user_credits (user_id, credits)
  VALUES (new.id, 3);
  
  -- If there's a referrer, give them 50 bonus credits
  IF new.raw_user_meta_data ->> 'referrer_whatsapp' IS NOT NULL THEN
    -- Find the referrer user by whatsapp number
    SELECT p.id INTO referrer_user_id
    FROM public.profiles p
    WHERE p.whatsapp_number = new.raw_user_meta_data ->> 'referrer_whatsapp'
    LIMIT 1;
    
    -- If referrer found, add 50 credits
    IF referrer_user_id IS NOT NULL THEN
      UPDATE public.user_credits
      SET credits = credits + 50,
          updated_at = now()
      WHERE user_id = referrer_user_id;
    END IF;
  END IF;
  
  RETURN new;
END;
$$;

-- Create function to decrease credits
CREATE OR REPLACE FUNCTION public.decrease_user_credits(amount INTEGER DEFAULT 1)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT credits INTO current_credits
  FROM public.user_credits
  WHERE user_id = auth.uid();
  
  -- Check if user has enough credits
  IF current_credits >= amount THEN
    -- Decrease credits
    UPDATE public.user_credits
    SET credits = credits - amount,
        updated_at = now()
    WHERE user_id = auth.uid();
    
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$;

-- Create function to get user credits
CREATE OR REPLACE FUNCTION public.get_user_credits()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_credits INTEGER;
BEGIN
  SELECT credits INTO user_credits
  FROM public.user_credits
  WHERE user_id = auth.uid();
  
  RETURN COALESCE(user_credits, 0);
END;
$$;
