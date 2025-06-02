
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const TeluguWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "నేను", "మీరు", "అతను", "ఆమె", "మేము", "మీరందరు", "వారు", "ఇది", "అది", "ఏది",
    "ఎవరు", "ఎక్కడ", "ఎప్పుడు", "ఎందుకు", "ఎలా", "అవును", "కాదు", "దయచేసి", "ధన్యవాదాలు", "క్షమించండి",
    "పేరు", "ఇల్లు", "నీరు", "తినడం", "సమయం", "రోజు", "రాత్రి", "ఉదయం", "సాయంత్రం", "సంవత్సరం",
    "నెల", "వారం", "ఈరోజు", "రేపు", "నిన్న", "అమ్మ", "నాన్న", "అన్న", "అక్క", "పిల్లవాడు",
    "మనిషి", "స్త్రీ", "స్నేహితుడు", "గురువు", "వైద్యుడు", "పుస్తకం", "కలం", "కాగితం", "మేజు", "కుర్చీ",
    "గది", "తలుపు", "కిటికీ", "పైకప్పు", "నేల", "రోడ్డు", "కారు", "రైలు", "విమానం", "చెట్టు",
    "పువ్వు", "ఆకు", "పండు", "కూరగాయ", "అన్నం", "రొట్టె", "పాలు", "టీ", "కాఫీ", "చక్కెర",
    "ఉప్పు", "నూనె", "మాంసం", "చేప", "గుడ్డు", "ఎరుపు", "తెలుపు", "నలుపు", "నీలం", "ఆకుపచ్చ",
    "పసుపు", "గులాబీ", "గోధుమ", "చిన్న", "పెద్ద", "కొత్త", "పాత", "వేడిమి", "చల్లని", "మంచి",
    "చెడ్డ", "సంతోషం", "దుఃఖం", "వేగం", "నిదానం", "పైన", "క్రింద", "లోపల", "బయట", "ఇక్కడ"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Telugu word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-telugu" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Telugu
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            తెలుగు పదాలు (Telugu Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Telugu words
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

export default TeluguWords;
