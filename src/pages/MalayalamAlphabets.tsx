
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const MalayalamAlphabets = () => {
  const vowels = [
    "അ", "ആ", "ഇ", "ഈ", "ഉ", "ഊ", "ഋ", "ഌ", "എ", "ഏ", "ഐ", "ഒ", "ഓ", "ഔ", "അം", "അഃ"
  ];

  const consonants = [
    "ക", "ഖ", "ഗ", "ഘ", "ങ", "ച", "ഛ", "ജ", "ഝ", "ഞ", "ട", "ഠ", "ഡ", "ഢ", "ണ", 
    "ത", "ഥ", "ദ", "ധ", "ന", "പ", "ഫ", "ബ", "ഭ", "മ", "യ", "ര", "ല", "വ", "ശ", "ഷ", 
    "സ", "ഹ", "ള", "ഴ", "റ", "ൻ", "ൾ", "ൺ"
  ];

  const playAudio = (letter: string) => {
    console.log(`Playing audio for Malayalam letter: ${letter}`);
    // Audio functionality will be implemented when user provides ElevenLabs API key
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">മലയാളം അക്ഷരമാല</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the letters.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Vowels Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">സ്വരങ്ങൾ (Vowels)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
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
            <h2 className="text-3xl font-bold mb-8 text-center">വ്യഞ്ജനങ്ങൾ (Consonants)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
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

export default MalayalamAlphabets;
