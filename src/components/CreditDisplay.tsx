
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Clock, AlertTriangle } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';

const CreditDisplay: React.FC = () => {
  const { credits, creditDetails, loading } = useCredits();
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimeLeft = () => {
      if (creditDetails?.next_expiry) {
        const now = new Date();
        const expiry = new Date(creditDetails.next_expiry);
        const diff = expiry.getTime() - now.getTime();

        if (diff > 0) {
          const minutes = Math.floor(diff / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${minutes}m ${seconds}s`);
        } else {
          setTimeLeft('Expired');
        }
      } else {
        setTimeLeft('');
      }
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [creditDetails?.next_expiry]);

  if (loading) {
    return (
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Loading credits...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isLowCredits = credits < 2;
  const hasExpiringSoon = timeLeft && !timeLeft.includes('Expired') && timeLeft.includes('0m');

  return (
    <Card className={`mb-6 ${isLowCredits ? 'bg-red-50 border-red-200' : 'bg-primary/5 border-primary/20'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className={`h-5 w-5 ${isLowCredits ? 'text-red-500' : 'text-primary'}`} />
            <div>
              <span className="font-medium text-sm">
                {credits} Credit{credits !== 1 ? 's' : ''} Available
              </span>
              {creditDetails && (
                <p className="text-xs text-muted-foreground">
                  Total: {creditDetails.total_credits} | Valid: {creditDetails.valid_credits}
                </p>
              )}
            </div>
          </div>
          
          {timeLeft && timeLeft !== 'Expired' && (
            <div className={`flex items-center space-x-2 ${hasExpiringSoon ? 'text-orange-600' : 'text-muted-foreground'}`}>
              <Clock className="h-4 w-4" />
              <span className="text-sm font-mono">
                {timeLeft}
              </span>
            </div>
          )}

          {isLowCredits && (
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Low Credits</span>
            </div>
          )}
        </div>

        {credits === 0 && (
          <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">
              No credits available. Invite friends using your WhatsApp number to earn 50 credits per referral!
            </p>
          </div>
        )}

        {hasExpiringSoon && credits > 0 && (
          <div className="mt-3 p-3 bg-orange-100 border border-orange-200 rounded-md">
            <p className="text-sm text-orange-700">
              Your next credit expires soon! Use it before it's gone.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreditDisplay;
