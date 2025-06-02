
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const EnglishAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const alphabet = [
    { letter: "A", lowercase: "a", pronunciation: "/eɪ/", example: "Apple - A red fruit" },
    { letter: "B", lowercase: "b", pronunciation: "/biː/", example: "Ball - A round object" },
    { letter: "C", lowercase: "c", pronunciation: "/siː/", example: "Cat - A small pet animal" },
    { letter: "D", lowercase: "d", pronunciation: "/diː/", example: "Dog - A loyal pet" },
    { letter: "E", lowercase: "e", pronunciation: "/iː/", example: "Elephant - A large animal" },
    { letter: "F", lowercase: "f", pronunciation: "/ɛf/", example: "Fish - Lives in water" },
    { letter: "G", lowercase: "g", pronunciation: "/dʒiː/", example: "Girl - A young female" },
    { letter: "H", lowercase: "h", pronunciation: "/eɪtʃ/", example: "House - A place to live" },
    { letter: "I", lowercase: "i", pronunciation: "/aɪ/", example: "Ice - Frozen water" },
    { letter: "J", lowercase: "j", pronunciation: "/dʒeɪ/", example: "Jump - To leap up" },
    { letter: "K", lowercase: "k", pronunciation: "/keɪ/", example: "Key - Opens a lock" },
    { letter: "L", lowercase: "l", pronunciation: "/ɛl/", example: "Lion - King of jungle" },
    { letter: "M", lowercase: "m", pronunciation: "/ɛm/", example: "Moon - Earth's satellite" },
    { letter: "N", lowercase: "n", pronunciation: "/ɛn/", example: "Night - When it's dark" },
    { letter: "O", lowercase: "o", pronunciation: "/oʊ/", example: "Orange - A citrus fruit" },
    { letter: "P", lowercase: "p", pronunciation: "/piː/", example: "Pen - Writing tool" },
    { letter: "Q", lowercase: "q", pronunciation: "/kjuː/", example: "Queen - Female ruler" },
    { letter: "R", lowercase: "r", pronunciation: "/ɑːr/", example: "Rose - A beautiful flower" },
    { letter: "S", lowercase: "s", pronunciation: "/ɛs/", example: "Sun - Source of light" },
    { letter: "T", lowercase: "t", pronunciation: "/tiː/", example: "Tree - A tall plant" },
    { letter: "U", lowercase: "u", pronunciation: "/juː/", example: "Umbrella - Protection from rain" },
    { letter: "V", lowercase: "v", pronunciation: "/viː/", example: "Violin - Musical instrument" },
    { letter: "W", lowercase: "w", pronunciation: "/ˈdʌbəl juː/", example: "Water - Essential for life" },
    { letter: "X", lowercase: "x", pronunciation: "/ɛks/", example: "X-ray - Medical imaging" },
    { letter: "Y", lowercase: "y", pronunciation: "/waɪ/", example: "Yellow - A bright color" },
    { letter: "Z", lowercase: "z", pronunciation: "/ziː/", example: "Zoo - Place with animals" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">English Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn all 26 letters of the English alphabet from A to Z
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
                <strong>Example:</strong> {letter.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishAlphabet;
