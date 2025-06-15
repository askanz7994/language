
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, AlertTriangle } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';

const CreditDisplay: React.FC = () => {
  const { credits, creditDetails, loading } = useCredits();

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

  const isLowCredits = credits > 0 && credits < 2;

  return (
    <Card className={`mb-6 ${credits === 0 ? 'bg-red-50 border-red-200' : 'bg-primary/5 border-primary/20'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CreditCard className={`h-5 w-5 ${credits === 0 ? 'text-red-500' : 'text-primary'}`} />
            <div>
              <span className="font-medium text-sm">
                {credits} Credit{credits !== 1 ? 's' : ''} Available
              </span>
              {creditDetails && creditDetails.total_credits > 0 && (
                <p className="text-xs text-muted-foreground">
                  Total Earned: {creditDetails.total_credits}
                </p>
              )}
            </div>
          </div>
          
          {isLowCredits && (
            <div className="flex items-center space-x-2 text-orange-600">
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
      </CardContent>
    </Card>
  );
};

export default CreditDisplay;
