
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import VoiceInterface from "@/components/english/VoiceInterface";
import CreditDisplay from "@/components/CreditDisplay";

const EnglishConversation = () => {
  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            English Conversation Practice
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Have a real-time conversation with an AI tutor to improve your speaking skills.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
            <CreditDisplay />
            <VoiceInterface />
        </div>
        
      </div>
    </div>
  );
};

export default EnglishConversation;
