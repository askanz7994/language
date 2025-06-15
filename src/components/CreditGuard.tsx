import React from 'react';
import { useCredits } from '@/hooks/useCredits';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [deductionState, setDeductionState] = React.useState<'idle' | 'in_progress' | 'success' | 'failed'>('idle');
  const { toast } = useToast();

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
      setDeductionState('in_progress');
      const success = await useCredit();
      if (success) {
        setDeductionState('success');
        onCreditDeducted?.();
        toast({
          title: "Credit used",
          description: "1 credit has been deducted for accessing this content.",
        });
      } else {
        setDeductionState('failed');
        toast({
          title: "Deduction Failed",
          description: "Could not deduct credit. Please try again later.",
          variant: "destructive",
        });
      }
    };
    
    // Only run deduction if it's enabled, in idle state, and user data is loaded.
    if (deductCredits && deductionState === 'idle' && !loading && user && credits >= requiredCredits) {
      handleCreditDeduction();
    }
    
  }, [deductCredits, deductionState, loading, user, credits, requiredCredits, useCredit, onCreditDeducted, toast]);

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

  if (deductCredits && deductionState !== 'success') {
    if (deductionState === 'failed') {
       return (
        <div className="min-h-screen animated-bg flex items-center justify-center p-4">
          <Card className="language-card max-w-md">
            <CardHeader className="text-center">
              <CreditCard className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle>Credit Deduction Failed</CardTitle>
              <CardDescription>
                We were unable to deduct a credit. Please try again or contact support if the issue persists.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Link to="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-xl">Verifying credits...</div>
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
        <Card className="fixed top-4 right-4 w-fit z-50 language-card shadow-lg">
          <CardContent className="p-2 md:p-3">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="text-center">
                <p className="text-[9px] md:text-[10px] text-muted-foreground">Next deduction in</p>
                <div className="flex items-center justify-center space-x-1">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                  <p className="font-bold text-sm md:text-base">{formatTime(remainingTime)}</p>
                </div>
              </div>
              <div className="border-l h-6 md:h-8 border-muted-foreground/20"></div>
              <div className="text-center">
                <p className="text-[9px] md:text-[10px] text-muted-foreground">Credits left</p>
                <div className="flex items-center justify-center space-x-1">
                  <CreditCard className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                  <p className="font-bold text-sm md:text-base">{credits}</p>
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
