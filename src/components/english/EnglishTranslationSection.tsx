
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useState } from "react";
import { translationData } from "@/data/translationData";
import { useAuth } from "@/contexts/AuthContext";

interface EnglishTranslationSectionProps {
  topicId: string;
}

const EnglishTranslationSection = ({ topicId }: EnglishTranslationSectionProps) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const { profile } = useAuth();
  
  const preferredLanguage = profile?.preferred_language || 'Malayalam';
  const translation = translationData[topicId as keyof typeof translationData]?.[preferredLanguage];

  if (!translation) {
    return null;
  }

  return (
    <Card className="language-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl flex items-center space-x-2">
            <Languages className="h-5 w-5" />
            <span>Translation</span>
          </CardTitle>
          <Button
            onClick={() => setShowTranslation(!showTranslation)}
            variant={showTranslation ? "default" : "outline"}
            className="glow-button text-xs md:text-base"
          >
            {showTranslation ? "Hide" : "Show"} {preferredLanguage}
          </Button>
        </div>
      </CardHeader>
      {showTranslation && (
        <CardContent>
          <div className="text-xs md:text-lg leading-relaxed p-4 bg-muted rounded-lg">
            {translation}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default EnglishTranslationSection;
