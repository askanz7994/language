import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
const LearnMalayalam = () => {
  return <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/languages" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Languages
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn Malayalam
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start your Malayalam journey with structured lessons from basics to fluency
          </p>
        </div>

        {/* Learning Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Alphabets Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">അ</div>
            <h2 className="text-3xl font-bold mb-4">Alphabets</h2>
            <p className="text-muted-foreground mb-6">
              Learn Malayalam letters and their sounds
            </p>
            <Link to="/malayalam/alphabets">
              <Button className="glow-button w-full">
                Learn Alphabets
              </Button>
            </Link>
          </div>

          {/* Numbers Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">1</div>
            <h2 className="text-3xl font-bold mb-4">Numbers</h2>
            <p className="text-muted-foreground mb-6">
              Learn to count and recognize numbers in Malayalam script
            </p>
            <Link to="/malayalam/numbers">
              <Button className="glow-button w-full">
                Learn Numbers
              </Button>
            </Link>
          </div>

          {/* Words Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">വാ</div>
            <h2 className="text-3xl font-bold mb-4">Words</h2>
            <p className="text-muted-foreground mb-6">
              Build your vocabulary with essential Malayalam words
            </p>
            <Link to="/malayalam/words">
              <Button className="glow-button w-full">
                Learn Words
              </Button>
            </Link>
          </div>

          {/* Paragraph Module */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">പാ</div>
            <h2 className="text-3xl font-bold mb-4">Paragraph</h2>
            <p className="text-muted-foreground mb-6">
              Practice reading and understanding Malayalam paragraphs
            </p>
            <Link to="/malayalam/paragraph">
              <Button className="glow-button w-full">
                Read Paragraphs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default LearnMalayalam;