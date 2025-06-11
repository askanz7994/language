
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { GrammarTopicsList } from "@/components/english/GrammarTopicsList";

const EnglishGrammar = () => {
  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            English Grammar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master English grammar with examples and explanations
          </p>
        </div>

        <GrammarTopicsList />
      </div>
    </div>
  );
};

export default EnglishGrammar;
