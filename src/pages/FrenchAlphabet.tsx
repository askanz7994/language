
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const FrenchAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const alphabet = [
    { letter: "A", lowercase: "a", pronunciation: "/a/", example: "Amour - Love" },
    { letter: "B", lowercase: "b", pronunciation: "/be/", example: "Bonjour - Hello" },
    { letter: "C", lowercase: "c", pronunciation: "/se/", example: "Chat - Cat" },
    { letter: "D", lowercase: "d", pronunciation: "/de/", example: "Danse - Dance" },
    { letter: "E", lowercase: "e", pronunciation: "/ə/", example: "École - School" },
    { letter: "F", lowercase: "f", pronunciation: "/ɛf/", example: "Famille - Family" },
    { letter: "G", lowercase: "g", pronunciation: "/ʒe/", example: "Garçon - Boy" },
    { letter: "H", lowercase: "h", pronunciation: "/aʃ/", example: "Hôtel - Hotel" },
    { letter: "I", lowercase: "i", pronunciation: "/i/", example: "Île - Island" },
    { letter: "J", lowercase: "j", pronunciation: "/ʒi/", example: "Jardin - Garden" },
    { letter: "K", lowercase: "k", pronunciation: "/ka/", example: "Kilo - Kilo" },
    { letter: "L", lowercase: "l", pronunciation: "/ɛl/", example: "Livre - Book" },
    { letter: "M", lowercase: "m", pronunciation: "/ɛm/", example: "Mère - Mother" },
    { letter: "N", lowercase: "n", pronunciation: "/ɛn/", example: "Nuit - Night" },
    { letter: "O", lowercase: "o", pronunciation: "/o/", example: "Orange - Orange" },
    { letter: "P", lowercase: "p", pronunciation: "/pe/", example: "Père - Father" },
    { letter: "Q", lowercase: "q", pronunciation: "/ky/", example: "Question - Question" },
    { letter: "R", lowercase: "r", pronunciation: "/ɛʁ/", example: "Rouge - Red" },
    { letter: "S", lowercase: "s", pronunciation: "/ɛs/", example: "Soleil - Sun" },
    { letter: "T", lowercase: "t", pronunciation: "/te/", example: "Temps - Time" },
    { letter: "U", lowercase: "u", pronunciation: "/y/", example: "Université - University" },
    { letter: "V", lowercase: "v", pronunciation: "/ve/", example: "Ville - City" },
    { letter: "W", lowercase: "w", pronunciation: "/dublə ve/", example: "Weekend - Weekend" },
    { letter: "X", lowercase: "x", pronunciation: "/iks/", example: "Xylophone - Xylophone" },
    { letter: "Y", lowercase: "y", pronunciation: "/iɡʁɛk/", example: "Yoga - Yoga" },
    { letter: "Z", lowercase: "z", pronunciation: "/zɛd/", example: "Zéro - Zero" },
  ];

  const accentedLetters = [
    { letter: "À", lowercase: "à", pronunciation: "/a/", example: "À bientôt - See you soon" },
    { letter: "É", lowercase: "é", pronunciation: "/e/", example: "Été - Summer" },
    { letter: "È", lowercase: "è", pronunciation: "/ɛ/", example: "Très - Very" },
    { letter: "Ê", lowercase: "ê", pronunciation: "/ɛ/", example: "Être - To be" },
    { letter: "Ë", lowercase: "ë", pronunciation: "/ɛ/", example: "Noël - Christmas" },
    { letter: "Ç", lowercase: "ç", pronunciation: "/s/", example: "Français - French" },
    { letter: "Ô", lowercase: "ô", pronunciation: "/o/", example: "Hôpital - Hospital" },
    { letter: "Ù", lowercase: "ù", pronunciation: "/y/", example: "Où - Where" },
    { letter: "Û", lowercase: "û", pronunciation: "/y/", example: "Sûr - Sure" },
    { letter: "Ü", lowercase: "ü", pronunciation: "/y/", example: "Aigüe - Sharp" },
    { letter: "Î", lowercase: "î", pronunciation: "/i/", example: "Île - Island" },
    { letter: "Ï", lowercase: "ï", pronunciation: "/i/", example: "Maïs - Corn" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-french" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to French
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">French Alphabet (Alphabet Français)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the French alphabet including accented letters and special characters
          </p>
        </div>

        {/* Basic Alphabet Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Basic Alphabet (Alphabet de base)</h2>
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
                  <strong>Exemple:</strong> {letter.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accented Letters Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Accented Letters (Lettres accentuées)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {accentedLetters.map((letter, index) => (
              <div key={index} className="number-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-bold text-primary">{letter.letter}</div>
                    <div className="text-3xl text-muted-foreground">{letter.lowercase}</div>
                  </div>
                  <Button
                    onClick={() => playAudio(index + alphabet.length)}
                    className={`audio-button ${playingAudio === index + alphabet.length ? 'animate-pulse' : ''}`}
                    size="sm"
                  >
                    🔊
                  </Button>
                </div>
                <div className="text-2xl mb-2 font-semibold">{letter.letter}</div>
                <div className="text-muted-foreground mb-3 italic">{letter.pronunciation}</div>
                <div className="text-sm border-t border-border pt-3">
                  <strong>Exemple:</strong> {letter.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrenchAlphabet;
