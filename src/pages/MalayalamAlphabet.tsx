
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";

const MalayalamAlphabet = () => {
  const vowels = [
    { letter: "അ", romanization: "a", pronunciation: "a as in father" },
    { letter: "ആ", romanization: "aa", pronunciation: "aa as in father (long)" },
    { letter: "ഇ", romanization: "i", pronunciation: "i as in bit" },
    { letter: "ഈ", romanization: "ii", pronunciation: "ee as in feet" },
    { letter: "ഉ", romanization: "u", pronunciation: "u as in put" },
    { letter: "ഊ", romanization: "uu", pronunciation: "oo as in boot" },
    { letter: "ഋ", romanization: "ri", pronunciation: "ri as in rip" },
    { letter: "എ", romanization: "e", pronunciation: "e as in red" },
    { letter: "ഏ", romanization: "ee", pronunciation: "ay as in day" },
    { letter: "ഐ", romanization: "ai", pronunciation: "i as in kite" },
    { letter: "ഒ", romanization: "o", pronunciation: "o as in pot" },
    { letter: "ഓ", romanization: "oo", pronunciation: "o as in note" },
    { letter: "ഔ", romanization: "au", pronunciation: "ow as in cow" }
  ];

  const consonants = [
    { letter: "ക", romanization: "ka", pronunciation: "k as in kite" },
    { letter: "ഖ", romanization: "kha", pronunciation: "kh as in block-head" },
    { letter: "ഗ", romanization: "ga", pronunciation: "g as in go" },
    { letter: "ഘ", romanization: "gha", pronunciation: "gh as in log-house" },
    { letter: "ങ", romanization: "nga", pronunciation: "ng as in song" },
    { letter: "ച", romanization: "cha", pronunciation: "ch as in chair" },
    { letter: "ഛ", romanization: "chha", pronunciation: "chh as in church-hall" },
    { letter: "ജ", romanization: "ja", pronunciation: "j as in jar" },
    { letter: "ഝ", romanization: "jha", pronunciation: "jh as in hedgehog" },
    { letter: "ഞ", romanization: "nya", pronunciation: "ny as in canyon" },
    { letter: "ട", romanization: "ta", pronunciation: "t as in top (retroflex)" },
    { letter: "ഠ", romanization: "tha", pronunciation: "th as in hot-house (retroflex)" },
    { letter: "ഡ", romanization: "da", pronunciation: "d as in dog (retroflex)" },
    { letter: "ഢ", romanization: "dha", pronunciation: "dh as in red-house (retroflex)" },
    { letter: "ണ", romanization: "na", pronunciation: "n as in pen (retroflex)" },
    { letter: "ത", romanization: "tha", pronunciation: "th as in think" },
    { letter: "ഥ", romanization: "thha", pronunciation: "thh as in anthill" },
    { letter: "ദ", romanization: "da", pronunciation: "d as in that" },
    { letter: "ധ", romanization: "dha", pronunciation: "dh as in adhere" },
    { letter: "ന", romanization: "na", pronunciation: "n as in name" },
    { letter: "പ", romanization: "pa", pronunciation: "p as in pen" },
    { letter: "ഫ", romanization: "pha", pronunciation: "ph as in uphill" },
    { letter: "ബ", romanization: "ba", pronunciation: "b as in bat" },
    { letter: "ഭ", romanization: "bha", pronunciation: "bh as in abhor" },
    { letter: "മ", romanization: "ma", pronunciation: "m as in man" },
    { letter: "യ", romanization: "ya", pronunciation: "y as in yes" },
    { letter: "ര", romanization: "ra", pronunciation: "r as in run" },
    { letter: "ല", romanization: "la", pronunciation: "l as in love" },
    { letter: "വ", romanization: "va", pronunciation: "v as in victory" },
    { letter: "ശ", romanization: "sha", pronunciation: "sh as in ship" },
    { letter: "ഷ", romanization: "sha", pronunciation: "sh as in wish (retroflex)" },
    { letter: "സ", romanization: "sa", pronunciation: "s as in sun" },
    { letter: "ഹ", romanization: "ha", pronunciation: "h as in house" },
    { letter: "ള", romanization: "la", pronunciation: "l as in pull (retroflex)" },
    { letter: "ഴ", romanization: "zha", pronunciation: "zh as in measure" },
    { letter: "റ", romanization: "ra", pronunciation: "r as in red (hard)" }
  ];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Malayalam
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Malayalam Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Malayalam script with vowels and consonants
          </p>
        </div>

        {/* Vowels Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-8">Vowels (സ്വരങ്ങൾ)</h2>
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
          <h2 className="text-4xl font-bold text-center mb-8">Consonants (വ്യഞ്ജനങ്ങൾ)</h2>
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
          <Link to="/malayalam/numbers">
            <Button className="glow-button">
              Next: Learn Numbers
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MalayalamAlphabet;
