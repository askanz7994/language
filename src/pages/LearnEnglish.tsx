import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LearnEnglish = () => {
  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn English
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the global language of communication and opportunity
          </p>
        </div>

        {/* Learning Modules */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Numbers Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">1</div>
            <h2 className="text-3xl font-bold mb-4">Numbers</h2>
            <p className="text-muted-foreground mb-6">
              Learn to count and recognize numbers in English
            </p>
            <Link to="/english/numbers">
              <Button className="glow-button w-full">
                Learn Numbers
              </Button>
            </Link>
          </div>

          {/* Words Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">W</div>
            <h2 className="text-3xl font-bold mb-4">Words</h2>
            <p className="text-muted-foreground mb-6">
              Build your vocabulary with essential English words
            </p>
            <Link to="/english/words">
              <Button className="glow-button w-full">
                Learn Words
              </Button>
            </Link>
          </div>

          {/* Paragraph Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">P</div>
            <h2 className="text-3xl font-bold mb-4">Paragraph</h2>
            <p className="text-muted-foreground mb-6">
              Practice reading and understanding English paragraphs
            </p>
            <Link to="/english/paragraph">
              <Button className="glow-button w-full">
                Read Paragraphs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnEnglish;
