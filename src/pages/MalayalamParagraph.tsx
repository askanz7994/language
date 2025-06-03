
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MalayalamParagraph = () => {
  const topics = [
    {
      id: "beautiful-kerala",
      title: "Beautiful Kerala",
      icon: "🌴",
      malayalam: "കേരളം"
    },
    {
      id: "indian-culture",
      title: "Indian Culture",
      icon: "🎭",
      malayalam: "സംസ്കാരം"
    },
    {
      id: "monsoon-season",
      title: "Monsoon Season",
      icon: "🌧️",
      malayalam: "മഴക്കാലം"
    },
    {
      id: "traditional-food",
      title: "Traditional Food",
      icon: "🍛",
      malayalam: "ഭക്ഷണം"
    },
    {
      id: "education-system",
      title: "Education System",
      icon: "📚",
      malayalam: "വിദ്യാഭ്യാസം"
    },
    {
      id: "festivals-celebrations",
      title: "Festivals and Celebrations",
      icon: "🎉",
      malayalam: "ഉത്സവങ്ങൾ"
    },
    {
      id: "art-literature",
      title: "Art and Literature",
      icon: "🎨",
      malayalam: "കലയും സാഹിത്യവും"
    },
    {
      id: "wildlife-nature",
      title: "Wildlife and Nature",
      icon: "🐘",
      malayalam: "വന്യജീവി"
    },
    {
      id: "traditional-medicine",
      title: "Traditional Medicine",
      icon: "🌿",
      malayalam: "ആയുർവേദം"
    },
    {
      id: "modern-kerala",
      title: "Modern Kerala",
      icon: "🏙️",
      malayalam: "ആധുനിക കേരളം"
    }
  ];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Malayalam Topics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore various topics through Malayalam paragraphs
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {topics.map((topic) => (
            <div key={topic.id} className="language-card text-center">
              <div className="text-6xl mb-6">{topic.icon}</div>
              <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
              <div className="text-3xl mb-6 text-primary">{topic.malayalam}</div>
              <Link to={`/malayalam/paragraph/${topic.id}`}>
                <Button className="glow-button w-full">
                  Read
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MalayalamParagraph;
