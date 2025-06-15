import React from 'react';
import { useCredits } from '@/hooks/useCredits';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, Timer } from 'lucide-react';

interface CreditGuardProps {
  children: React.ReactNode;
  requiredCredits?: number;
  deductCredits?: boolean;
  onCreditDeducted?: () => void;
  periodicDeduction?: boolean;
}

const CreditGuard: React.FC<CreditGuardProps> = ({ 
  children, 
  requiredCredits = 1, 
  deductCredits = false,
  onCreditDeducted,
  periodicDeduction = false,
}) => {
  const { credits, loading, useCredit } = useCredits();
  const { user } = useAuth();
  const [hasDeducted, setHasDeducted] = React.useState(false);

  const DEDUCTION_INTERVAL = 5 * 60; // 5 minutes
  const [remainingTime, setRemainingTime] = React.useState(DEDUCTION_INTERVAL);

  React.useEffect(() => {
    if (!periodicDeduction || !user || loading || credits < requiredCredits) return;

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [periodicDeduction, user, loading, credits, requiredCredits]);

  React.useEffect(() => {
    if (!periodicDeduction || !user) return;

    if (remainingTime === 0) {
      useCredit().then((success) => {
        if (success) {
          setRemainingTime(DEDUCTION_INTERVAL);
        }
      });
    }
  }, [remainingTime, periodicDeduction, user, useCredit]);

  React.useEffect(() => {
    const handleCreditDeduction = async () => {
      if (deductCredits && !hasDeducted && user && credits >= requiredCredits) {
        const success = await useCredit();
        if (success) {
          setHasDeducted(true);
          onCreditDeducted?.();
        }
      }
    };

    if (!loading) {
      handleCreditDeduction();
    }
  }, [deductCredits, hasDeducted, user, credits, requiredCredits, loading, useCredit, onCreditDeducted]);

  if (loading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center p-4">
        <Card className="language-card max-w-md">
          <CardHeader className="text-center">
            <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access this content
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/auth">
              <Button className="glow-button">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (credits < requiredCredits) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center p-4">
        <Card className="language-card max-w-md">
          <CardHeader className="text-center">
            <CreditCard className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Insufficient Credits</CardTitle>
            <CardDescription>
              You need {requiredCredits} credit{requiredCredits > 1 ? 's' : ''} to access this content. 
              You currently have {credits} credit{credits !== 1 ? 's' : ''}.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Invite friends using your WhatsApp number to earn 50 credits per referral!
            </p>
            <div className="flex flex-col gap-2">
              <Link to="/profile">
                <Button className="glow-button w-full">
                  View Profile
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      {periodicDeduction && (
        <Card className="fixed bottom-4 right-4 w-fit z-50 language-card shadow-2xl">
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Next deduction in</p>
                <div className="flex items-center justify-center space-x-2">
                  <Timer className="h-5 w-5 text-primary" />
                  <p className="font-bold text-lg">{formatTime(remainingTime)}</p>
                </div>
              </div>
              <div className="border-l h-10 border-muted-foreground/20"></div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Credits left</p>
                <div className="flex items-center justify-center space-x-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <p className="font-bold text-lg">{credits}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {children}
    </>
  );
};

export default CreditGuard;
