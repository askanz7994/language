
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";

const HindiAlphabet = () => {
  const vowels = [
    { letter: "अ", romanization: "a", pronunciation: "a as in about" },
    { letter: "आ", romanization: "aa", pronunciation: "aa as in father" },
    { letter: "इ", romanization: "i", pronunciation: "i as in bit" },
    { letter: "ई", romanization: "ii", pronunciation: "ee as in feet" },
    { letter: "उ", romanization: "u", pronunciation: "u as in put" },
    { letter: "ऊ", romanization: "uu", pronunciation: "oo as in boot" },
    { letter: "ऋ", romanization: "ri", pronunciation: "ri as in rip" },
    { letter: "ए", romanization: "e", pronunciation: "ay as in day" },
    { letter: "ऐ", romanization: "ai", pronunciation: "i as in kite" },
    { letter: "ओ", romanization: "o", pronunciation: "o as in note" },
    { letter: "औ", romanization: "au", pronunciation: "ow as in cow" }
  ];

  const consonants = [
    { letter: "क", romanization: "ka", pronunciation: "k as in kite" },
    { letter: "ख", romanization: "kha", pronunciation: "kh as in block-head" },
    { letter: "ग", romanization: "ga", pronunciation: "g as in go" },
    { letter: "घ", romanization: "gha", pronunciation: "gh as in log-house" },
    { letter: "ङ", romanization: "nga", pronunciation: "ng as in song" },
    { letter: "च", romanization: "cha", pronunciation: "ch as in chair" },
    { letter: "छ", romanization: "chha", pronunciation: "chh as in church-hall" },
    { letter: "ज", romanization: "ja", pronunciation: "j as in jar" },
    { letter: "झ", romanization: "jha", pronunciation: "jh as in hedgehog" },
    { letter: "ञ", romanization: "nya", pronunciation: "ny as in canyon" },
    { letter: "ट", romanization: "ta", pronunciation: "t as in top (retroflex)" },
    { letter: "ठ", romanization: "tha", pronunciation: "th as in hot-house (retroflex)" },
    { letter: "ड", romanization: "da", pronunciation: "d as in dog (retroflex)" },
    { letter: "ढ", romanization: "dha", pronunciation: "dh as in red-house (retroflex)" },
    { letter: "ण", romanization: "na", pronunciation: "n as in pen (retroflex)" },
    { letter: "त", romanization: "ta", pronunciation: "t as in table" },
    { letter: "थ", romanization: "tha", pronunciation: "th as in think" },
    { letter: "द", romanization: "da", pronunciation: "d as in that" },
    { letter: "ध", romanization: "dha", pronunciation: "dh as in adhere" },
    { letter: "न", romanization: "na", pronunciation: "n as in name" },
    { letter: "प", romanization: "pa", pronunciation: "p as in pen" },
    { letter: "फ", romanization: "pha", pronunciation: "ph as in uphill" },
    { letter: "ब", romanization: "ba", pronunciation: "b as in bat" },
    { letter: "भ", romanization: "bha", pronunciation: "bh as in abhor" },
    { letter: "म", romanization: "ma", pronunciation: "m as in man" },
    { letter: "य", romanization: "ya", pronunciation: "y as in yes" },
    { letter: "र", romanization: "ra", pronunciation: "r as in run" },
    { letter: "ल", romanization: "la", pronunciation: "l as in love" },
    { letter: "व", romanization: "va", pronunciation: "v as in victory" },
    { letter: "श", romanization: "sha", pronunciation: "sh as in ship" },
    { letter: "ष", romanization: "sha", pronunciation: "sh as in wish (retroflex)" },
    { letter: "स", romanization: "sa", pronunciation: "s as in sun" },
    { letter: "ह", romanization: "ha", pronunciation: "h as in house" }
  ];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Hindi Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Devanagari script with vowels and consonants
          </p>
        </div>

        {/* Vowels Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Vowels (स्वर)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {vowels.map((vowel, index) => (
              <div key={index} className="language-card text-center p-6">
                <div className="text-4xl font-bold mb-2">{vowel.letter}</div>
                <div className="text-lg font-semibold text-primary mb-1">{vowel.romanization}</div>
                <div className="text-sm text-muted-foreground">{vowel.pronunciation}</div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Consonants Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Consonants (व्यंजन)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {consonants.map((consonant, index) => (
              <div key={index} className="language-card text-center p-6">
                <div className="text-4xl font-bold mb-2">{consonant.letter}</div>
                <div className="text-lg font-semibold text-primary mb-1">{consonant.romanization}</div>
                <div className="text-sm text-muted-foreground">{consonant.pronunciation}</div>
                <Button variant="ghost" size="sm" className="mt-2">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/hindi/numbers">
            <Button className="glow-button">
              Next: Learn Numbers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HindiAlphabet;
