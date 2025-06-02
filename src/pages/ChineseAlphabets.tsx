
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const ChineseAlphabets = () => {
  const initials = [
    "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x",
    "zh", "ch", "sh", "r", "z", "c", "s", "y", "w"
  ];

  const finals = [
    "a", "o", "e", "i", "u", "ü", "ai", "ei", "ui", "ao", "ou", "iu",
    "ie", "üe", "er", "an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"
  ];

  const tones = [
    { character: "mā", description: "first tone - high and level" },
    { character: "má", description: "second tone - rising" },
    { character: "mǎ", description: "third tone - falling and rising" },
    { character: "mà", description: "fourth tone - falling" },
    { character: "ma", description: "neutral tone - light and quick" }
  ];

  const playAudio = (sound: string) => {
    console.log(`Playing audio for Chinese Pinyin: ${sound}`);
    // Audio functionality will be implemented when user provides ElevenLabs API key
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">汉语拼音 (Hànyǔ Pīnyīn - Chinese Pinyin)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the sounds of Pinyin.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Initials Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Initials (声母)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {initials.map((initial, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-4">{initial}</div>
                  <Button
                    onClick={() => playAudio(initial)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Finals Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Finals (韵母)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {finals.map((final, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-4">{final}</div>
                  <Button
                    onClick={() => playAudio(final)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Tones Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Tones (声调)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tones.map((tone, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-2">{tone.character}</div>
                  <div className="text-sm text-muted-foreground mb-4">{tone.description}</div>
                  <Button
                    onClick={() => playAudio(tone.character)}
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

export default ChineseAlphabets;
