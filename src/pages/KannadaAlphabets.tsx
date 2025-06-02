
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const KannadaAlphabets = () => {
  const alphabets = [
    "ಅ", "ಆ", "ಇ", "ಈ", "ಉ", "ಊ", "ಋ", "ೠ", "ಌ", "ೡ", "ಎ", "ಏ", "ಐ", "ಒ", "ಓ", "ಔ",
    "ಕ", "ಖ", "ಗ", "ಘ", "ಙ", "ಚ", "ಛ", "ಜ", "ಝ", "ಞ", "ಟ", "ಠ", "ಡ", "ಢ", "ಣ",
    "ತ", "ಥ", "ದ", "ಧ", "ನ", "ಪ", "ಫ", "ಬ", "ಭ", "ಮ", "ಯ", "ರ", "ಲ", "ವ", "ಶ", "ಷ", "ಸ", "ಹ", "ಳ", "ಕ್ಷ", "ಜ್ಞ"
  ];

  const playAudio = (letter: string) => {
    console.log(`Playing audio for Kannada letter: ${letter}`);
    // Audio functionality will be implemented when user provides ElevenLabs API key
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-kannada" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Kannada
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">ಕನ್ನಡ ವರ್ಣಮಾಲೆ (Kannada Alphabet)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the letters.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="language-card">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {alphabets.map((letter, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-5xl font-bold mb-4">{letter}</div>
                  <Button
                    onClick={() => playAudio(letter)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KannadaAlphabets;
