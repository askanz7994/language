
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Hash, Type, Languages } from "lucide-react";

const LearnKannada = () => {
  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Kannada
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the language of Karnataka
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <Link to="/kannada/alphabets">
            <div className="language-card text-center cursor-pointer">
              <Languages className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Alphabet</h2>
              <p className="text-muted-foreground mb-6">
                Master the Kannada alphabet with pronunciation guide
              </p>
              <Button className="glow-button w-full">
                Learn Alphabet
              </Button>
            </div>
          </Link>

          <Link to="/kannada/numbers">
            <div className="language-card text-center cursor-pointer">
              <Hash className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Numbers</h2>
              <p className="text-muted-foreground mb-6">
                Learn Kannada numbers from 1 to 100 with pronunciation and examples
              </p>
              <Button className="glow-button w-full">
                Start Learning Numbers
              </Button>
            </div>
          </Link>

          <Link to="/kannada/words">
            <div className="language-card text-center cursor-pointer">
              <Type className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Words</h2>
              <p className="text-muted-foreground mb-6">
                Build your Kannada vocabulary with essential words and phrases
              </p>
              <Button className="glow-button w-full">
                Explore Words
              </Button>
            </div>
          </Link>

          <Link to="/kannada/paragraph">
            <div className="language-card text-center cursor-pointer">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Paragraphs</h2>
              <p className="text-muted-foreground mb-6">
                Practice reading and understanding Kannada through contextual paragraphs
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

export default LearnKannada;
