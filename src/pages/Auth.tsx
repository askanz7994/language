import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [referrerWhatsapp, setReferrerWhatsapp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
          toast.error("WhatsApp Number is a required field.");
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

        if (!uniquenessData.isUnique) {
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
          // With email confirmation disabled, user is signed in, and will be redirected.
          // No "check your email" message needed.
          toast.success("Account created successfully! Welcome!");
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen blur-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="language-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Welcome Back!' : 'Join Our Community'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to continue your language learning journey' 
                : 'Start your multilingual adventure today'
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">WhatsApp Number *</Label>
                    <Input
                      id="whatsappNumber"
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="Enter your WhatsApp number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referrerWhatsapp">Referrer WhatsApp Number (Optional)</Label>
                    <Input
                      id="referrerWhatsapp"
                      type="tel"
                      value={referrerWhatsapp}
                      onChange={(e) => setReferrerWhatsapp(e.target.value)}
                      placeholder="WhatsApp number of person who referred you"
                    />
                    <p className="text-xs text-muted-foreground">
                      If someone referred you, enter their WhatsApp number to give them 50 bonus credits!
                    </p>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="glow-button w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setFirstName('');
                  setLastName('');
                  setWhatsappNumber('');
                  setReferrerWhatsapp('');
                }}
                className="text-primary hover:text-primary/80"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
