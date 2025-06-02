
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Hash, Type } from "lucide-react";

const LearnTelugu = () => {
  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Telugu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn one of India's classical languages
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link to="/telugu/numbers">
            <div className="language-card text-center cursor-pointer">
              <Hash className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Numbers</h2>
              <p className="text-muted-foreground mb-6">
                Learn Telugu numbers from 1 to 100 with pronunciation and examples
              </p>
              <Button className="glow-button w-full">
                Start Learning Numbers
              </Button>
            </div>
          </Link>

          <Link to="/telugu/words">
            <div className="language-card text-center cursor-pointer">
              <Type className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Words</h2>
              <p className="text-muted-foreground mb-6">
                Build your Telugu vocabulary with essential words and phrases
              </p>
              <Button className="glow-button w-full">
                Explore Words
              </Button>
            </div>
          </Link>

          <Link to="/telugu/paragraph">
            <div className="language-card text-center cursor-pointer">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-3">Paragraphs</h2>
              <p className="text-muted-foreground mb-6">
                Practice reading and understanding Telugu through contextual paragraphs
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

export default LearnTelugu;
