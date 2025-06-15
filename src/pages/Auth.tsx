
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { useAuthForm } from '@/hooks/useAuthForm';
import SignUpFields from '@/components/auth/SignUpFields';
import PasswordInput from '@/components/auth/PasswordInput';

const Auth = () => {
  const {
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
  } = useAuthForm();

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
                : 'Start your multilingual adventure today'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLogin ? (
                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    required
                  />
                </div>
              ) : (
                <>
                  <SignUpFields
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    whatsappNumber={whatsappNumber}
                    setWhatsappNumber={setWhatsappNumber}
                    referrerWhatsapp={referrerWhatsapp}
                    setReferrerWhatsapp={setReferrerWhatsapp}
                  />
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
                </>
              )}

              <PasswordInput password={password} setPassword={setPassword} />

              <Button type="submit" className="glow-button w-full" disabled={isLoading}>
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
              </p>
              <Button
                variant="link"
                onClick={toggleFormType}
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
