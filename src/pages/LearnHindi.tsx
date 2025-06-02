
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LearnHindi = () => {
  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Learn Hindi</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover India's most widely spoken language with rich cultural heritage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="language-card text-center">
            <div className="text-6xl mb-6">अ</div>
            <h2 className="text-3xl font-bold mb-4">Alphabet</h2>
            <p className="text-muted-foreground mb-6">
              Learn the Hindi alphabet and Devanagari script
            </p>
            <Link to="/hindi/alphabet">
              <Button className="glow-button w-full">Learn Alphabet</Button>
            </Link>
          </div>

          <div className="language-card text-center">
            <div className="text-6xl mb-6">१</div>
            <h2 className="text-3xl font-bold mb-4">Numbers</h2>
            <p className="text-muted-foreground mb-6">
              Learn to count and recognize numbers in Hindi script
            </p>
            <Link to="/hindi/numbers">
              <Button className="glow-button w-full">Learn Numbers</Button>
            </Link>
          </div>

          <div className="language-card text-center">
            <div className="text-6xl mb-6">श</div>
            <h2 className="text-3xl font-bold mb-4">Words</h2>
            <p className="text-muted-foreground mb-6">
              Build your vocabulary with essential Hindi words
            </p>
            <Link to="/hindi/words">
              <Button className="glow-button w-full">Learn Words</Button>
            </Link>
          </div>

          <div className="language-card text-center">
            <div className="text-6xl mb-6">पा</div>
            <h2 className="text-3xl font-bold mb-4">Paragraph</h2>
            <p className="text-muted-foreground mb-6">
              Practice reading and understanding Hindi paragraphs
            </p>
            <Link to="/hindi/paragraph">
              <Button className="glow-button w-full">Read Paragraphs</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnHindi;
