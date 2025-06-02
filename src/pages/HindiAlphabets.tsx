
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const HindiAlphabets = () => {
  const vowels = [
    "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः"
  ];

  const consonants = [
    "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण",
    "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श",
    "ष", "स", "ह", "क्ष", "त्र", "ज्ञ"
  ];

  const playAudio = (letter: string) => {
    console.log(`Playing audio for Hindi letter: ${letter}`);
    // Audio functionality will be implemented when user provides ElevenLabs API key
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">हिंदी वर्णमाला</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the letters.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Vowels Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">स्वर (Vowels)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {vowels.map((vowel, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-4">{vowel}</div>
                  <Button
                    onClick={() => playAudio(vowel)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Consonants Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">व्यंजन (Consonants)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {consonants.map((consonant, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-4">{consonant}</div>
                  <Button
                    onClick={() => playAudio(consonant)}
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

export default HindiAlphabets;
