
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CreditGuard from "@/components/CreditGuard";
import CreditDisplay from "@/components/CreditDisplay";

const EnglishParagraph = () => {
  const topics = [
    {
      id: "kerala-landscapes",
      title: "The Allure of Kerala's Landscapes",
      description: "Explore the breathtaking beauty of God's Own Country"
    },
    {
      id: "malayalam-literature",
      title: "A Glimpse into Malayalam Literature",
      description: "Discover the rich literary heritage and famous authors"
    },
    {
      id: "kerala-festivals",
      title: "Celebrating Kerala's Diverse Festivals",
      description: "Learn about colorful traditions and community celebrations"
    },
    {
      id: "healthcare-ayurveda",
      title: "Kerala's Renowned Healthcare and Ayurveda",
      description: "Understand the global reputation of natural healing"
    },
    {
      id: "kerala-cuisine",
      title: "The Rich Flavors of Kerala Cuisine",
      description: "Taste the diverse and delicious culinary traditions"
    },
    {
      id: "education-kerala",
      title: "High Standards of Education in Kerala",
      description: "Learn about the state's educational achievements"
    },
    {
      id: "kerala-climate",
      title: "Understanding Kerala's Climate Diversity",
      description: "Explore the varied weather patterns and seasons"
    },
    {
      id: "kerala-backwaters",
      title: "The Enchanting Kerala Backwaters",
      description: "Experience the serene beauty of waterways"
    },
    {
      id: "kerala-art-forms",
      title: "Kerala's Vibrant Traditional Art Forms",
      description: "Discover classical performances and cultural expressions"
    },
    {
      id: "peace-harmony",
      title: "Kerala's Reputation for Peace and Harmony",
      description: "Understand the state's social unity and tolerance"
    }
  ];

  return (
    <CreditGuard requiredCredits={1}>
      <div className="min-h-screen animated-bg">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to English
          </Link>

          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              English Reading Topics
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Explore various topics through English paragraphs with pronunciation practice
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <CreditDisplay />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {topics.map((topic) => (
              <div key={topic.id} className="language-card text-center">
                <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{topic.title}</h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2">{topic.description}</p>
                <Link to={`/english/paragraph/${topic.id}`}>
                  <Button className="glow-button w-full text-xs md:text-base">
                    Read & Practice (1 Credit)
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CreditGuard>
  );
};

export default EnglishParagraph;
