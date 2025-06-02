
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const HindiAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const vowels = [
    { letter: "अ", name: "A", pronunciation: "/ə/", example: "अब (Ab) - Now" },
    { letter: "आ", name: "Aa", pronunciation: "/aː/", example: "आम (Aam) - Mango" },
    { letter: "इ", name: "I", pronunciation: "/ɪ/", example: "इधर (Idhar) - Here" },
    { letter: "ई", name: "Ee", pronunciation: "/iː/", example: "ईख (Eekh) - Sugarcane" },
    { letter: "उ", name: "U", pronunciation: "/ʊ/", example: "उल्लू (Ullu) - Owl" },
    { letter: "ऊ", name: "Oo", pronunciation: "/uː/", example: "ऊन (Oon) - Wool" },
    { letter: "ऋ", name: "Ru", pronunciation: "/rɪ/", example: "ऋषि (Rishi) - Sage" },
    { letter: "ए", name: "E", pronunciation: "/eː/", example: "एक (Ek) - One" },
    { letter: "ऐ", name: "Ai", pronunciation: "/ɛː/", example: "ऐसा (Aisa) - Such" },
    { letter: "ओ", name: "O", pronunciation: "/oː/", example: "ओर (Or) - Side" },
    { letter: "औ", name: "Au", pronunciation: "/ɔː/", example: "और (Aur) - And" },
  ];

  const consonants = [
    { letter: "क", name: "Ka", pronunciation: "/kə/", example: "कल (Kal) - Tomorrow" },
    { letter: "ख", name: "Kha", pronunciation: "/kʰə/", example: "खुश (Khush) - Happy" },
    { letter: "ग", name: "Ga", pronunciation: "/ɡə/", example: "गाना (Gaana) - Song" },
    { letter: "घ", name: "Gha", pronunciation: "/ɡʱə/", example: "घर (Ghar) - House" },
    { letter: "ङ", name: "Nga", pronunciation: "/ŋə/", example: "रंग (Rang) - Color" },
    { letter: "च", name: "Cha", pronunciation: "/t͡ʃə/", example: "चल (Chal) - Walk" },
    { letter: "छ", name: "Chha", pronunciation: "/t͡ʃʰə/", example: "छत (Chhat) - Roof" },
    { letter: "ज", name: "Ja", pronunciation: "/d͡ʒə/", example: "जल (Jal) - Water" },
    { letter: "झ", name: "Jha", pronunciation: "/d͡ʒʱə/", example: "झंडा (Jhanda) - Flag" },
    { letter: "ञ", name: "Nja", pronunciation: "/ɲə/", example: "ज्ञान (Gyaan) - Knowledge" },
    { letter: "ट", name: "Ta", pronunciation: "/ʈə/", example: "टमाटर (Tamatar) - Tomato" },
    { letter: "ठ", name: "Tha", pronunciation: "/ʈʰə/", example: "ठंडा (Thanda) - Cold" },
    { letter: "ड", name: "Da", pronunciation: "/ɖə/", example: "डाकिया (Dakiya) - Postman" },
    { letter: "ढ", name: "Dha", pronunciation: "/ɖʱə/", example: "ढक्कन (Dhakkan) - Lid" },
    { letter: "ण", name: "Na", pronunciation: "/ɳə/", example: "गुण (Gun) - Quality" },
    { letter: "त", name: "Ta", pronunciation: "/t̪ə/", example: "तुम (Tum) - You" },
    { letter: "थ", name: "Tha", pronunciation: "/t̪ʰə/", example: "थैला (Thaila) - Bag" },
    { letter: "द", name: "Da", pronunciation: "/d̪ə/", example: "दिन (Din) - Day" },
    { letter: "ध", name: "Dha", pronunciation: "/d̪ʱə/", example: "धन (Dhan) - Wealth" },
    { letter: "न", name: "Na", pronunciation: "/nə/", example: "नाम (Naam) - Name" },
    { letter: "प", name: "Pa", pronunciation: "/pə/", example: "पानी (Paani) - Water" },
    { letter: "फ", name: "Pha", pronunciation: "/pʰə/", example: "फल (Phal) - Fruit" },
    { letter: "ब", name: "Ba", pronunciation: "/bə/", example: "बच्चा (Bachcha) - Child" },
    { letter: "भ", name: "Bha", pronunciation: "/bʱə/", example: "भाई (Bhai) - Brother" },
    { letter: "म", name: "Ma", pronunciation: "/mə/", example: "माँ (Maan) - Mother" },
    { letter: "य", name: "Ya", pronunciation: "/jə/", example: "यहाँ (Yahan) - Here" },
    { letter: "र", name: "Ra", pronunciation: "/rə/", example: "राजा (Raja) - King" },
    { letter: "ल", name: "La", pronunciation: "/lə/", example: "लड़का (Ladka) - Boy" },
    { letter: "व", name: "Va", pronunciation: "/ʋə/", example: "वन (Van) - Forest" },
    { letter: "श", name: "Sha", pronunciation: "/ʃə/", example: "शहर (Shahar) - City" },
    { letter: "ष", name: "Sha", pronunciation: "/ʂə/", example: "षट्कोण (Shatkona) - Hexagon" },
    { letter: "स", name: "Sa", pronunciation: "/sə/", example: "सब (Sab) - All" },
    { letter: "ह", name: "Ha", pronunciation: "/ɦə/", example: "हम (Ham) - We" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hindi Alphabet (देवनागरी)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the Devanagari script with vowels and consonants
          </p>
        </div>

        {/* Vowels Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Vowels (स्वर)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vowels.map((vowel, index) => (
              <div key={index} className="number-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-primary">{vowel.letter}</div>
                  <Button
                    onClick={() => playAudio(index)}
                    className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                    size="sm"
                  >
                    🔊
                  </Button>
                </div>
                <div className="text-2xl mb-2 font-semibold">{vowel.name}</div>
                <div className="text-muted-foreground mb-3 italic">{vowel.pronunciation}</div>
                <div className="text-sm border-t border-border pt-3">
                  <strong>Example:</strong> {vowel.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consonants Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Consonants (व्यंजन)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {consonants.map((consonant, index) => (
              <div key={index} className="number-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-primary">{consonant.letter}</div>
                  <Button
                    onClick={() => playAudio(index + vowels.length)}
                    className={`audio-button ${playingAudio === index + vowels.length ? 'animate-pulse' : ''}`}
                    size="sm"
                  >
                    🔊
                  </Button>
                </div>
                <div className="text-2xl mb-2 font-semibold">{consonant.name}</div>
                <div className="text-muted-foreground mb-3 italic">{consonant.pronunciation}</div>
                <div className="text-sm border-t border-border pt-3">
                  <strong>Example:</strong> {consonant.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiAlphabet;
