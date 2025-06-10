
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const MalayalamParagraph = () => {
  const topics = [
    {
      id: "kerala-natural-beauty",
      title: "Kerala's Natural Beauty",
      malayalam: "കേരളത്തിന്റെ പ്രകൃതി സൗന്ദര്യം"
    },
    {
      id: "malayalam-language-literature",
      title: "Malayalam Language and Literature",
      malayalam: "മലയാള ഭാഷയും സാഹിത്യവും"
    },
    {
      id: "festivals-of-kerala",
      title: "Festivals of Kerala",
      malayalam: "കേരളത്തിലെ ഉത്സവങ്ങൾ"
    },
    {
      id: "ayurveda-healthcare",
      title: "Ayurveda and Healthcare",
      malayalam: "ആയുർവേദവും ആരോഗ്യസംരക്ഷണവും"
    },
    {
      id: "kerala-cuisine",
      title: "Kerala Cuisine",
      malayalam: "കേരളത്തിലെ ഭക്ഷണം"
    },
    {
      id: "education-in-kerala",
      title: "Education in Kerala",
      malayalam: "കേരളത്തിലെ വിദ്യാഭ്യാസം"
    },
    {
      id: "climate-of-kerala",
      title: "Climate of Kerala",
      malayalam: "കേരളത്തിലെ കാലാവസ്ഥ"
    },
    {
      id: "kerala-backwaters",
      title: "Kerala Backwaters",
      malayalam: "കേരളത്തിലെ കായലുകൾ"
    },
    {
      id: "art-forms-kerala",
      title: "Art Forms of Kerala",
      malayalam: "കേരളത്തിലെ കലാരൂപങ്ങൾ"
    },
    {
      id: "peace-and-harmony",
      title: "Peace and Harmony",
      malayalam: "സമാധാനവും ഐക്യവും"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {topics.map((topic) => (
            <div key={topic.id} className="language-card text-center">
              <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
              <div className="text-2xl mb-6 text-primary">{topic.malayalam}</div>
              <Link to={`/malayalam/paragraph/${topic.id}`}>
                <Button className="w-full">
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
