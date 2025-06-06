
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useState } from "react";
import { translationData } from "@/data/translationData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface EnglishTranslationSectionProps {
  topicId: string;
}

const EnglishTranslationSection = ({ topicId }: EnglishTranslationSectionProps) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();
  
  const preferredLanguage = profile?.preferred_language;
  const translation = preferredLanguage ? translationData[topicId as keyof typeof translationData]?.[preferredLanguage] : null;

  const handleLanguageSelect = () => {
    if (!preferredLanguage) {
      navigate('/profile');
    } else {
      setShowTranslation(!showTranslation);
    }
  };

  return (
    <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Languages className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">Translation</span>
        </div>
        <Button
          onClick={handleLanguageSelect}
          variant={showTranslation ? "default" : "outline"}
          className="glow-button text-xs md:text-base"
        >
          {!preferredLanguage 
            ? "Select Language" 
            : showTranslation 
              ? "Hide" 
              : `Show ${preferredLanguage}`
          }
        </Button>
      </div>
      
      {showTranslation && translation && (
        <div className="text-xs md:text-lg leading-relaxed p-4 bg-muted rounded-lg">
          {translation}
        </div>
      )}
      
      {!preferredLanguage && (
        <p className="text-sm text-muted-foreground">
          Select your preferred language in your profile to see translations.
        </p>
      )}
    </div>
  );
};

export default EnglishTranslationSection;
