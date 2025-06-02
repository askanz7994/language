
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const KannadaWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "ನಾನು", "ನೀವು", "ಅವನು", "ಅವಳು", "ನಾವು", "ನೀವೆಲ್ಲರು", "ಅವರು", "ಇದು", "ಅದು", "ಏನು",
    "ಯಾರು", "ಎಲ್ಲಿ", "ಯಾವಾಗ", "ಏಕೆ", "ಹೇಗೆ", "ಹೌದು", "ಇಲ್ಲ", "ದಯವಿಟ್ಟು", "ಧನ್ಯವಾದಗಳು", "ಕ್ಷಮಿಸಿ",
    "ಹೆಸರು", "ಮನೆ", "ನೀರು", "ಆಹಾರ", "ಸಮಯ", "ದಿನ", "ರಾತ್ರಿ", "ಬೆಳಿಗ್ಗೆ", "ಸಂಜೆ", "ವರ್ಷ",
    "ತಿಂಗಳು", "ವಾರ", "ಇಂದು", "ನಾಳೆ", "ನಿನ್ನೆ", "ಅಮ್ಮ", "ಅಪ್ಪ", "ಅಣ್ಣ", "ಅಕ್ಕ", "ಮಗು",
    "ಮನುಷ್ಯ", "ಹೆಂಗಸು", "ಸ್ನೇಹಿತ", "ಗುರು", "ವೈದ್ಯ", "ಪುಸ್ತಕ", "ಲೇಖನಿ", "ಕಾಗದ", "ಮೇಜು", "ಕುರ್ಚಿ",
    "ಕೋಣೆ", "ಬಾಗಿಲು", "ಕಿಟಕಿ", "ಛಾವಣಿ", "ನೆಲ", "ರಸ್ತೆ", "ಕಾರು", "ರೈಲು", "ವಿಮಾನ", "ಮರ",
    "ಹೂವು", "ಎಲೆ", "ಹಣ್ಣು", "ತರಕಾರಿ", "ಅನ್ನ", "ರೊಟ್ಟಿ", "ಹಾಲು", "ಚಹಾ", "ಕಾಫಿ", "ಸಕ್ಕರೆ",
    "ಉಪ್ಪು", "ಎಣ್ಣೆ", "ಮಾಂಸ", "ಮೀನು", "ಮೊಟ್ಟೆ", "ಕೆಂಪು", "ಬಿಳಿ", "ಕಪ್ಪು", "ನೀಲಿ", "ಹಸಿರು",
    "ಹಳದಿ", "ಗುಲಾಬಿ", "ಕಂದು", "ಚಿಕ್ಕ", "ದೊಡ್ಡ", "ಹೊಸ", "ಹಳೆಯ", "ಬಿಸಿ", "ತಂಪು", "ಒಳ್ಳೆಯ",
    "ಕೆಟ್ಟ", "ಸಂತೋಷ", "ದುಃಖ", "ವೇಗ", "ನಿಧಾನ", "ಮೇಲೆ", "ಕೆಳಗೆ", "ಒಳಗೆ", "ಹೊರಗೆ", "ಇಲ್ಲಿ"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Kannada word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-kannada" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Kannada
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ಕನ್ನಡ ಪದಗಳು (Kannada Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Kannada words
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{word}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Vocabulary Builder</h3>
            <p className="text-muted-foreground mb-4">
              Click on any word card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio pronunciation coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KannadaWords;
