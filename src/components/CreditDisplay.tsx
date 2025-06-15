import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, AlertTriangle, Info } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreditDisplay: React.FC = () => {
  const { credits, loading } = useCredits();

  if (loading) {
    return (
      <Card className="w-fit mx-auto mb-6 bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Loading credits...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isLowCredits = credits > 0 && credits <= 3;

  return (
    <TooltipProvider>
      <Card className={`w-fit mx-auto mb-6 ${credits === 0 ? 'bg-red-50 border-red-200' : 'bg-primary/5 border-primary/20'}`}>
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <CreditCard className={`h-5 w-5 ${credits === 0 ? 'text-red-500' : 'text-primary'}`} />
              <span className="font-medium text-sm">
                {credits} Credit{credits !== 1 ? 's' : ''} remaining
              </span>
            </div>
            
            {isLowCredits && (
              <div className="flex items-center space-x-2 text-orange-600 ml-6">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Low Credits</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>refer a friend for extra 50 credits</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {credits === 0 && (
            <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">
                No credits available.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default CreditDisplay;
