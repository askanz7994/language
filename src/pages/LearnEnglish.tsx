
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LearnEnglish = () => {
  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        {/* Page Title */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Learn English
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Master the global language of communication and opportunity
          </p>
        </div>

        {/* Learning Modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
          {/* Alphabets Module */}
          <div className="language-card text-center">
            <div className="text-4xl md:text-6xl mb-4 md:mb-6">A</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Alphabets</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2">
              Learn English letters and their sounds
            </p>
            <Link to="/english/alphabets">
              <Button className="glow-button w-full text-sm md:text-base">
                Learn Alphabets
              </Button>
            </Link>
          </div>

          {/* Numbers Module */}
          <div className="language-card text-center">
            <div className="text-4xl md:text-6xl mb-4 md:mb-6">1</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Numbers</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2">
              Learn to count and recognize numbers in English
            </p>
            <Link to="/english/numbers">
              <Button className="glow-button w-full text-sm md:text-base">
                Learn Numbers
              </Button>
            </Link>
          </div>

          {/* Words Module */}
          <div className="language-card text-center">
            <div className="text-4xl md:text-6xl mb-4 md:mb-6">W</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Words</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2">
              Build your vocabulary with essential English words
            </p>
            <Link to="/english/words">
              <Button className="glow-button w-full text-sm md:text-base">
                Learn Words
              </Button>
            </Link>
          </div>

          {/* Paragraph Module */}
          <div className="language-card text-center">
            <div className="text-4xl md:text-6xl mb-4 md:mb-6">P</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Paragraph</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2">
              Practice reading and understanding English paragraphs
            </p>
            <Link to="/english/paragraph">
              <Button className="glow-button w-full text-sm md:text-base">
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
