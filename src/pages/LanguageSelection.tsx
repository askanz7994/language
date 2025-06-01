
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LanguageSelection = () => {
  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Choose Your Language Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the language you want to master and begin your learning adventure
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Malayalam Card */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">മ</div>
            <h2 className="text-3xl font-bold mb-4">Malayalam</h2>
            <p className="text-muted-foreground mb-6">
              Learn the beautiful language of Kerala, spoken by over 34 million people
            </p>
            <Link to="/learn-malayalam">
              <Button className="glow-button w-full">
                Learn Malayalam
              </Button>
            </Link>
          </div>

          {/* English Card */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">A</div>
            <h2 className="text-3xl font-bold mb-4">English</h2>
            <p className="text-muted-foreground mb-6">
              Master the global language of communication and opportunity
            </p>
            <Link to="/learn-english">
              <Button className="glow-button w-full">
                Learn English
              </Button>
            </Link>
          </div>

          {/* Hindi Card */}
          <div className="language-card text-center">
            <div className="text-6xl mb-6">अ</div>
            <h2 className="text-3xl font-bold mb-4">Hindi</h2>
            <p className="text-muted-foreground mb-6">
              Discover India's most widely spoken language with rich cultural heritage
            </p>
            <Link to="/learn-hindi">
              <Button className="glow-button w-full">
                Learn Hindi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
