
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LearnFrench = () => {
  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn French
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the language of love and diplomacy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Link to="/french/alphabets">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">A</div>
              <h2 className="text-3xl font-bold mb-4">Alphabets</h2>
              <p className="text-muted-foreground mb-6">
                Learn French letters and their sounds
              </p>
              <Button className="glow-button w-full">
                Learn Alphabets
              </Button>
            </div>
          </Link>

          <Link to="/french/numbers">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">1</div>
              <h2 className="text-3xl font-bold mb-4">Numbers</h2>
              <p className="text-muted-foreground mb-6">
                Learn French numbers from 1 to 100 with pronunciation and examples
              </p>
              <Button className="glow-button w-full">
                Start Learning Numbers
              </Button>
            </div>
          </Link>

          <Link to="/french/words">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">W</div>
              <h2 className="text-3xl font-bold mb-4">Words</h2>
              <p className="text-muted-foreground mb-6">
                Build your French vocabulary with essential words and phrases
              </p>
              <Button className="glow-button w-full">
                Explore Words
              </Button>
            </div>
          </Link>

          <Link to="/french/paragraph">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">P</div>
              <h2 className="text-3xl font-bold mb-4">Paragraphs</h2>
              <p className="text-muted-foreground mb-6">
                Practice reading and understanding French through contextual paragraphs
              </p>
              <Button className="glow-button w-full">
                Read Paragraphs
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnFrench;
