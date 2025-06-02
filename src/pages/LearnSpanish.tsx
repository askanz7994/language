import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
const LearnSpanish = () => {
  return <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Spanish
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the second most spoken language in the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Link to="/spanish/alphabets">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">Ñ</div>
              <h2 className="text-3xl font-bold mb-4">Alphabets</h2>
              <p className="text-muted-foreground mb-6">
                Learn Spanish letters and their sounds
              </p>
              <Button className="glow-button w-full">
                Learn Alphabets
              </Button>
            </div>
          </Link>

          <Link to="/spanish/numbers">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">1</div>
              <h2 className="text-3xl font-bold mb-4">Numbers</h2>
              <p className="text-muted-foreground mb-6">
                Learn Spanish numbers from 1 to 100 with pronunciation and examples
              </p>
              <Button className="glow-button w-full">
                Start Learning Numbers
              </Button>
            </div>
          </Link>

          <Link to="/spanish/words">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">W</div>
              <h2 className="text-3xl font-bold mb-4">Words</h2>
              <p className="text-muted-foreground mb-6">
                Build your Spanish vocabulary with essential words and phrases
              </p>
              <Button className="glow-button w-full">
                Explore Words
              </Button>
            </div>
          </Link>

          <Link to="/spanish/paragraph">
            <div className="language-card text-center cursor-pointer">
              <div className="text-6xl mb-6">P</div>
              <h2 className="text-3xl font-bold mb-4">Paragraphs</h2>
              <p className="text-muted-foreground mb-6">
                Practice reading and understanding Spanish through contextual paragraphs
              </p>
              <Button className="glow-button w-full">
                Read Paragraphs
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>;
};
export default LearnSpanish;