import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen blur-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Unlock New Worlds:
            <span className="block text-primary">Learn a Language Today!</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Master Malayalam, English, Hindi, and more. Connect with cultures, expand your mind, and achieve your linguistic goals.
          </p>
          <Link to="/languages">
            <Button className="glow-button text-lg px-8 py-[32px] text-[#03022e] bg-[#04cbe0]">
              Get Started Now! <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Why Learn with Us Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why Learn with Us?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="language-card text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-3">Practical & Engaging Lessons</h3>
            <p className="text-muted-foreground">Learn through real-world scenarios and interactive exercises.</p>
          </div>
          <div className="language-card text-center">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-3">Structured Progress</h3>
            <p className="text-muted-foreground">Follow a clear learning path designed for effective mastery.</p>
          </div>
          <div className="language-card text-center">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-3">Comprehensive Content</h3>
            <p className="text-muted-foreground">From basic numbers to complex paragraphs, we cover it all.</p>
          </div>
          <div className="language-card text-center">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
            <p className="text-muted-foreground">Learn at your own pace, anytime, anywhere.</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-lg font-semibold mb-2">Choose Language</h3>
            <p className="text-muted-foreground">Select from Malayalam, English, or Hindi</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-lg font-semibold mb-2">Explore Numbers & Words</h3>
            <p className="text-muted-foreground">Start with basics and build vocabulary</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-lg font-semibold mb-2">Practice with Paragraphs</h3>
            <p className="text-muted-foreground">Apply your knowledge in context</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
            <h3 className="text-lg font-semibold mb-2">Master Your Skills</h3>
            <p className="text-muted-foreground">Achieve fluency through practice</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">&copy; 2024 Language Learning Platform. Start your journey today!</p>
        </div>
      </footer>
    </div>;
};
export default Index;