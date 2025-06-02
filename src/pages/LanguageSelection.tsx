
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LanguageSelection = () => {
  const languages = [
    { name: "Malayalam", symbol: "മ", path: "/learn-malayalam", description: "Learn the beautiful language of Kerala, spoken by over 34 million people" },
    { name: "English", symbol: "A", path: "/learn-english", description: "Master the global language of communication and opportunity" },
    { name: "Hindi", symbol: "अ", path: "/learn-hindi", description: "Discover India's most widely spoken language with rich cultural heritage" },
    { name: "Spanish", symbol: "Ñ", path: "/learn-spanish", description: "Learn the second most spoken language in the world" },
    { name: "French", symbol: "À", path: "/learn-french", description: "Master the language of love and diplomacy" },
    { name: "German", symbol: "Ä", path: "/learn-german", description: "Learn the language of innovation and engineering" },
    { name: "Chinese (Simplified)", symbol: "中", path: "/learn-chinese", description: "Explore the world's most spoken language" },
    { name: "Japanese", symbol: "あ", path: "/learn-japanese", description: "Discover the language of technology and tradition" },
    { name: "Korean", symbol: "한", path: "/learn-korean", description: "Learn the language of K-pop and Korean culture" },
    { name: "Portuguese", symbol: "Ç", path: "/learn-portuguese", description: "Master the language spoken across continents" },
    { name: "Russian", symbol: "Я", path: "/learn-russian", description: "Learn the language of literature and science" },
    { name: "Arabic", symbol: "ع", path: "/learn-arabic", description: "Discover the language of the Quran and poetry" },
    { name: "Indonesian", symbol: "ñ", path: "/learn-indonesian", description: "Learn the language of Southeast Asia's largest country" },
    { name: "Italian", symbol: "È", path: "/learn-italian", description: "Master the language of art, food, and fashion" },
    { name: "Turkish", symbol: "Ğ", path: "/learn-turkish", description: "Learn the bridge language between Europe and Asia" },
    { name: "Vietnamese", symbol: "ă", path: "/learn-vietnamese", description: "Discover the tonal language of Vietnam" },
    { name: "Thai", symbol: "ก", path: "/learn-thai", description: "Learn the beautiful script of Thailand" },
    { name: "Polish", symbol: "Ł", path: "/learn-polish", description: "Master the language of Poland and its rich history" },
    { name: "Dutch", symbol: "ij", path: "/learn-dutch", description: "Learn the language of the Netherlands" },
    { name: "Swedish", symbol: "Å", path: "/learn-swedish", description: "Discover the language of Scandinavia" },
    { name: "Telugu", symbol: "తె", path: "/learn-telugu", description: "Learn one of India's classical languages" },
    { name: "Urdu", symbol: "اُ", path: "/learn-urdu", description: "Master the language of poetry and literature" },
    { name: "Kannada", symbol: "ಕ", path: "/learn-kannada", description: "Learn the language of Karnataka" }
  ];

  return (
    <div className="min-h-screen blur-bg">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {languages.map((language, index) => (
            <div key={index} className="language-card text-center">
              <div className="text-4xl mb-4">{language.symbol}</div>
              <h2 className="text-xl font-bold mb-3">{language.name}</h2>
              <p className="text-muted-foreground mb-6 text-sm min-h-[3rem]">
                {language.description}
              </p>
              <Link to={language.path}>
                <Button className="glow-button w-full">
                  Learn {language.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
