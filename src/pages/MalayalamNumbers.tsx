
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const MalayalamNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", malayalam: "പൂജ്യം", transliteration: "pūjyam", example: "0 books - പൂജ്യം പുസ്തകങ്ങൾ" },
    { digit: "1", malayalam: "ഒന്ന്", transliteration: "onnŭ", example: "1 apple - ഒരു ആപ്പിൾ" },
    { digit: "2", malayalam: "രണ്ട്", transliteration: "raṇṭŭ", example: "2 cats - രണ്ട് പൂച്ചകൾ" },
    { digit: "3", malayalam: "മൂന്ന്", transliteration: "mūnnŭ", example: "3 birds - മൂന്ന് പക്ഷികൾ" },
    { digit: "4", malayalam: "നാല്", transliteration: "nālŭ", example: "4 flowers - നാല് പൂക്കൾ" },
    { digit: "5", malayalam: "അഞ്ച്", transliteration: "añcŭ", example: "5 trees - അഞ്ച് മരങ്ങൾ" },
    { digit: "6", malayalam: "ആറ്", transliteration: "āṟŭ", example: "6 stars - ആറ് നക്ഷത്രങ്ങൾ" },
    { digit: "7", malayalam: "ഏഴ്", transliteration: "ēḻŭ", example: "7 days - ഏഴ് ദിവസങ്ങൾ" },
    { digit: "8", malayalam: "എട്ട്", transliteration: "eṭṭŭ", example: "8 hours - എട്ട് മണിക്കൂർ" },
    { digit: "9", malayalam: "ഒമ്പത്", transliteration: "ompatŭ", example: "9 months - ഒമ്പത് മാസങ്ങൾ" },
    { digit: "10", malayalam: "പത്ത്", transliteration: "pattŭ", example: "10 fingers - പത്ത് വിരലുകൾ" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    // Simulate audio playback
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Numbers in Malayalam
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and recognize numbers in Malayalam script
          </p>
        </div>

        {/* Numbers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-3xl mb-2 font-semibold">{number.malayalam}</div>
              <div className="text-muted-foreground mb-3 italic">{number.transliteration}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Example:</strong> {number.example}
              </div>
            </div>
          ))}
        </div>

        {/* Practice Section */}
        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Practice Time!</h3>
            <p className="text-muted-foreground mb-4">
              Click on any number card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio feature coming soon with native speaker recordings!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalayalamNumbers;
