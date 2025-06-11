
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, BookOpen, Mic, Volume2, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen blur-bg">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">English Learning Platform</h1>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          ) : user ? (
            <Link to="/profile">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn English Step by Step
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            A structured approach to learning English, covering alphabets, numbers, vocabulary, grammar, and reading comprehension with audio support.
          </p>
          <Link to={user ? "/learn-english" : "/auth"}>
            <Button className="glow-button text-lg px-8 py-4">
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Learning Modules */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Learning Modules</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="language-card text-center">
            <div className="text-5xl mb-4">A</div>
            <h3 className="text-xl font-semibold mb-3">Alphabets</h3>
            <p className="text-muted-foreground">Learn the 26 English letters and their pronunciation</p>
          </div>
          <div className="language-card text-center">
            <div className="text-5xl mb-4">1</div>
            <h3 className="text-xl font-semibold mb-3">Numbers</h3>
            <p className="text-muted-foreground">Master counting and number recognition in English</p>
          </div>
          <div className="language-card text-center">
            <div className="text-5xl mb-4">W</div>
            <h3 className="text-xl font-semibold mb-3">Vocabulary</h3>
            <p className="text-muted-foreground">Build your word knowledge with common English terms</p>
          </div>
          <div className="language-card text-center">
            <div className="text-5xl mb-4">P</div>
            <h3 className="text-xl font-semibold mb-3">Reading</h3>
            <p className="text-muted-foreground">Practice reading comprehension with guided texts</p>
          </div>
        </div>
      </div>

      {/* Platform Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="language-card text-center">
            <Volume2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Audio Pronunciation</h3>
            <p className="text-muted-foreground">Listen to correct pronunciation with word-by-word highlighting</p>
          </div>
          <div className="language-card text-center">
            <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Speaking Practice</h3>
            <p className="text-muted-foreground">Record yourself reading and compare with native speakers</p>
          </div>
          <div className="language-card text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Grammar Lessons</h3>
            <p className="text-muted-foreground">Learn essential English grammar rules with examples</p>
          </div>
          <div className="language-card text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Progressive Learning</h3>
            <p className="text-muted-foreground">Structured curriculum from basic to intermediate level</p>
          </div>
          <div className="language-card text-center">
            <div className="text-4xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-3">Multi-language Support</h3>
            <p className="text-muted-foreground">Interface translations to support learners worldwide</p>
          </div>
          <div className="language-card text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-3">Mobile Friendly</h3>
            <p className="text-muted-foreground">Learn anywhere with responsive design for all devices</p>
          </div>
        </div>
      </div>

      {/* Learning Path */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Learning Path</h2>
        <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Alphabets</h3>
            <p className="text-sm text-muted-foreground">Start with letter recognition</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Numbers</h3>
            <p className="text-sm text-muted-foreground">Learn basic counting</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Words</h3>
            <p className="text-sm text-muted-foreground">Build vocabulary foundation</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">Grammar</h3>
            <p className="text-sm text-muted-foreground">Understand sentence structure</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">5</div>
            <h3 className="text-lg font-semibold mb-2">Reading</h3>
            <p className="text-sm text-muted-foreground">Practice comprehension</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center bg-primary/10 rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Begin your English learning journey with our structured approach
          </p>
          <Link to={user ? "/learn-english" : "/auth"}>
            <Button className="glow-button text-lg px-8 py-4">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; 2024 English Learning Platform. Learn English effectively.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
