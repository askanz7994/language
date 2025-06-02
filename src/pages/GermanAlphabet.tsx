
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const GermanAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const alphabet = [
    { letter: "A", lowercase: "a", pronunciation: "/aː/", example: "Apfel - Apple" },
    { letter: "B", lowercase: "b", pronunciation: "/beː/", example: "Buch - Book" },
    { letter: "C", lowercase: "c", pronunciation: "/tseː/", example: "Computer - Computer" },
    { letter: "D", lowercase: "d", pronunciation: "/deː/", example: "Deutsch - German" },
    { letter: "E", lowercase: "e", pronunciation: "/eː/", example: "Essen - Food" },
    { letter: "F", lowercase: "f", pronunciation: "/ɛf/", example: "Familie - Family" },
    { letter: "G", lowercase: "g", pronunciation: "/ɡeː/", example: "Garten - Garden" },
    { letter: "H", lowercase: "h", pronunciation: "/haː/", example: "Haus - House" },
    { letter: "I", lowercase: "i", pronunciation: "/iː/", example: "Italien - Italy" },
    { letter: "J", lowercase: "j", pronunciation: "/jɔt/", example: "Jahr - Year" },
    { letter: "K", lowercase: "k", pronunciation: "/kaː/", example: "Kind - Child" },
    { letter: "L", lowercase: "l", pronunciation: "/ɛl/", example: "Liebe - Love" },
    { letter: "M", lowercase: "m", pronunciation: "/ɛm/", example: "Mutter - Mother" },
    { letter: "N", lowercase: "n", pronunciation: "/ɛn/", example: "Name - Name" },
    { letter: "O", lowercase: "o", pronunciation: "/oː/", example: "Oma - Grandmother" },
    { letter: "P", lowercase: "p", pronunciation: "/peː/", example: "Papa - Dad" },
    { letter: "Q", lowercase: "q", pronunciation: "/kuː/", example: "Qualität - Quality" },
    { letter: "R", lowercase: "r", pronunciation: "/ɛʁ/", example: "Rot - Red" },
    { letter: "S", lowercase: "s", pronunciation: "/ɛs/", example: "Sonne - Sun" },
    { letter: "T", lowercase: "t", pronunciation: "/teː/", example: "Tag - Day" },
    { letter: "U", lowercase: "u", pronunciation: "/uː/", example: "Uhr - Clock" },
    { letter: "V", lowercase: "v", pronunciation: "/faʊ/", example: "Vater - Father" },
    { letter: "W", lowercase: "w", pronunciation: "/veː/", example: "Wasser - Water" },
    { letter: "X", lowercase: "x", pronunciation: "/ɪks/", example: "Xylophon - Xylophone" },
    { letter: "Y", lowercase: "y", pronunciation: "/ˈʏpsilɔn/", example: "Yoga - Yoga" },
    { letter: "Z", lowercase: "z", pronunciation: "/tsɛt/", example: "Zeit - Time" },
    { letter: "Ä", lowercase: "ä", pronunciation: "/ɛː/", example: "Bär - Bear" },
    { letter: "Ö", lowercase: "ö", pronunciation: "/øː/", example: "Löwe - Lion" },
    { letter: "Ü", lowercase: "ü", pronunciation: "/yː/", example: "Über - Over" },
    { letter: "ß", lowercase: "ß", pronunciation: "/ɛs ˈtsɛt/", example: "Weiß - White" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-german" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to German
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">German Alphabet (Deutsches Alphabet)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn all 30 letters of the German alphabet including umlauts (Ä, Ö, Ü) and eszett (ß)
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {alphabet.map((letter, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-primary">{letter.letter}</div>
                  <div className="text-3xl text-muted-foreground">{letter.lowercase}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-2xl mb-2 font-semibold">{letter.letter}</div>
              <div className="text-muted-foreground mb-3 italic">{letter.pronunciation}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Beispiel:</strong> {letter.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GermanAlphabet;
