
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, BookOpen, Mic, Volume2, Target, CreditCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCredits } from "@/hooks/useCredits";

const Index = () => {
  const { user, loading } = useAuth();
  const { credits, loading: creditsLoading } = useCredits();

  return (
    <div className="min-h-screen blur-bg">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">English Learning Platform</h1>
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          ) : user ? (
            <div className="flex items-center space-x-4">
              {!creditsLoading && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 rounded-full">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{credits} credits</span>
                </div>
              )}
              <Link to="/profile">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </Link>
            </div>
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Master English:
            <span className="block text-primary">Your Gateway to Global Communication!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Learn English from alphabets to advanced paragraphs. Practice pronunciation, build vocabulary, and achieve fluency with our comprehensive learning platform.
          </p>
          {user && credits === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <p className="text-yellow-800 text-sm">
                You have 0 credits remaining. Invite friends to earn more credits!
              </p>
            </div>
          ) : null}
          <Link to={user && credits > 0 ? "/learn-english" : "/auth"}>
            <Button className="glow-button text-lg px-8 py-[32px] text-[#03022e] bg-[#04cbe0]">
              {user && credits > 0 ? 'Continue Learning' : 'Start Now'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Learning Modules Preview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Complete English Learning Journey</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="language-card text-center">
            <div className="text-6xl mb-6">A</div>
            <h3 className="text-xl font-semibold mb-3">Alphabets</h3>
            <p className="text-muted-foreground">Master English letters and their sounds</p>
          </div>
          <div className="language-card text-center">
            <div className="text-6xl mb-6">1</div>
            <h3 className="text-xl font-semibold mb-3">Numbers</h3>
            <p className="text-muted-foreground">Learn to count and use numbers in English</p>
          </div>
          <div className="language-card text-center">
            <div className="text-6xl mb-6">W</div>
            <h3 className="text-xl font-semibold mb-3">Vocabulary</h3>
            <p className="text-muted-foreground">Build essential English word knowledge</p>
          </div>
          <div className="language-card text-center">
            <div className="text-6xl mb-6">P</div>
            <h3 className="text-xl font-semibold mb-3">Reading</h3>
            <p className="text-muted-foreground">Practice with engaging paragraphs</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Our English Platform?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="language-card text-center">
            <Volume2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Interactive Audio</h3>
            <p className="text-muted-foreground">Listen to native pronunciations with word highlighting</p>
          </div>
          <div className="language-card text-center">
            <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Speech Practice</h3>
            <p className="text-muted-foreground">Record yourself and get pronunciation feedback</p>
          </div>
          <div className="language-card text-center">
            <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Rich Content</h3>
            <p className="text-muted-foreground">Learn about Kerala culture while mastering English</p>
          </div>
          <div className="language-card text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Structured Learning</h3>
            <p className="text-muted-foreground">Progressive curriculum from basics to advanced</p>
          </div>
          <div className="language-card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Practical Focus</h3>
            <p className="text-muted-foreground">Real-world English for everyday communication</p>
          </div>
          <div className="language-card text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Learn at Your Pace</h3>
            <p className="text-muted-foreground">Flexible learning that fits your schedule</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Start with Basics</h3>
            <p className="text-muted-foreground">Learn alphabets and numbers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Build Vocabulary</h3>
            <p className="text-muted-foreground">Master essential English words</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Practice Reading</h3>
            <p className="text-muted-foreground">Read engaging paragraphs with audio</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">Perfect Pronunciation</h3>
            <p className="text-muted-foreground">Record and improve your speaking</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center bg-primary/10 rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Master English?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of learners who have improved their English with our platform
          </p>
          <Link to={user && credits > 0 ? "/learn-english" : "/auth"}>
            <Button className="glow-button text-lg px-8 py-4">
              {user && credits > 0 ? 'Continue Your Journey' : 'Begin Your English Journey'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; 2024 English Learning Platform. Master English, Connect with the World!</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
