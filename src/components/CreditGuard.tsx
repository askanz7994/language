
import React from 'react';
import { useCredits } from '@/hooks/useCredits';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, ArrowLeft } from 'lucide-react';

interface CreditGuardProps {
  children: React.ReactNode;
  requiredCredits?: number;
  deductCredits?: boolean;
  onCreditDeducted?: () => void;
}

const CreditGuard: React.FC<CreditGuardProps> = ({ 
  children, 
  requiredCredits = 1, 
  deductCredits = false,
  onCreditDeducted 
}) => {
  const { credits, loading, decreaseCredits } = useCredits();
  const { user } = useAuth();
  const [hasDeducted, setHasDeducted] = React.useState(false);

  React.useEffect(() => {
    const handleCreditDeduction = async () => {
      if (deductCredits && !hasDeducted && user && credits >= requiredCredits) {
        const success = await decreaseCredits(requiredCredits);
        if (success) {
          setHasDeducted(true);
          onCreditDeducted?.();
        }
      }
    };

    if (!loading) {
      handleCreditDeduction();
    }
  }, [deductCredits, hasDeducted, user, credits, requiredCredits, loading]);

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

  return <>{children}</>;
};

export default CreditGuard;
