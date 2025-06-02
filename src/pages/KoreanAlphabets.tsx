
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const KoreanAlphabets = () => {
  const basicConsonants = [
    { char: "ㄱ", romanization: "g/k" },
    { char: "ㄴ", romanization: "n" },
    { char: "ㄷ", romanization: "d/t" },
    { char: "ㄹ", romanization: "r/l" },
    { char: "ㅁ", romanization: "m" },
    { char: "ㅂ", romanization: "b/p" },
    { char: "ㅅ", romanization: "s" },
    { char: "ㅇ", romanization: "ng/silent" },
    { char: "ㅈ", romanization: "j" },
    { char: "ㅊ", romanization: "ch" },
    { char: "ㅋ", romanization: "k" },
    { char: "ㅌ", romanization: "t" },
    { char: "ㅍ", romanization: "p" },
    { char: "ㅎ", romanization: "h" }
  ];

  const basicVowels = [
    { char: "ㅏ", romanization: "a" },
    { char: "ㅑ", romanization: "ya" },
    { char: "ㅓ", romanization: "eo" },
    { char: "ㅕ", romanization: "yeo" },
    { char: "ㅗ", romanization: "o" },
    { char: "ㅛ", romanization: "yo" },
    { char: "ㅜ", romanization: "u" },
    { char: "ㅠ", romanization: "yu" },
    { char: "ㅡ", romanization: "eu" },
    { char: "ㅣ", romanization: "i" }
  ];

  const compoundVowels = [
    { char: "ㅐ", romanization: "ae" },
    { char: "ㅔ", romanization: "e" },
    { char: "ㅚ", romanization: "oe" },
    { char: "ㅟ", romanization: "wi" },
    { char: "ㅘ", romanization: "wa" },
    { char: "ㅝ", romanization: "wo" },
    { char: "ㅙ", romanization: "wae" },
    { char: "ㅞ", romanization: "we" },
    { char: "ㅢ", romanization: "ui" }
  ];

  const doubleConsonants = [
    { char: "ㄲ", romanization: "kk" },
    { char: "ㄸ", romanization: "tt" },
    { char: "ㅃ", romanization: "pp" },
    { char: "ㅆ", romanization: "ss" },
    { char: "ㅉ", romanization: "jj" }
  ];

  const playAudio = (character: string) => {
    console.log(`Playing audio for Korean character: ${character}`);
    // Audio functionality will be implemented when user provides ElevenLabs API key
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">한글 (Hangul - Korean Alphabet)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn the letters.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Basic Consonants Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Basic Consonants (자음)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {basicConsonants.map((consonant, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-2">{consonant.char}</div>
                  <div className="text-sm text-muted-foreground mb-4">({consonant.romanization})</div>
                  <Button
                    onClick={() => playAudio(consonant.char)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Basic Vowels Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Basic Vowels (모음)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {basicVowels.map((vowel, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-2">{vowel.char}</div>
                  <div className="text-sm text-muted-foreground mb-4">({vowel.romanization})</div>
                  <Button
                    onClick={() => playAudio(vowel.char)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Compound Vowels Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Compound Vowels (복합 모음)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {compoundVowels.map((vowel, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-2">{vowel.char}</div>
                  <div className="text-sm text-muted-foreground mb-4">({vowel.romanization})</div>
                  <Button
                    onClick={() => playAudio(vowel.char)}
                    className="audio-button"
                    size="sm"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Double Consonants Section */}
          <div className="language-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Double Consonants (쌍자음)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {doubleConsonants.map((consonant, index) => (
                <div key={index} className="word-card text-center">
                  <div className="text-4xl font-bold mb-2">{consonant.char}</div>
                  <div className="text-sm text-muted-foreground mb-4">({consonant.romanization})</div>
                  <Button
                    onClick={() => playAudio(consonant.char)}
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

export default KoreanAlphabets;
