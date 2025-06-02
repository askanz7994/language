
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const MalayalamNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "1", malayalam: "ഒന്ന്" },
    { digit: "2", malayalam: "രണ്ട്" },
    { digit: "3", malayalam: "മൂന്ന്" },
    { digit: "4", malayalam: "നാല്" },
    { digit: "5", malayalam: "അഞ്ച്" },
    { digit: "6", malayalam: "ആറ്" },
    { digit: "7", malayalam: "ഏഴ്" },
    { digit: "8", malayalam: "എട്ട്" },
    { digit: "9", malayalam: "ഒൻപത്" },
    { digit: "10", malayalam: "പത്ത്" },
    { digit: "11", malayalam: "പതിനൊന്ന്" },
    { digit: "12", malayalam: "പന്ത്രണ്ട്" },
    { digit: "13", malayalam: "പതിമൂന്ന്" },
    { digit: "14", malayalam: "പതിനാല്" },
    { digit: "15", malayalam: "പതിനഞ്ച്" },
    { digit: "16", malayalam: "പതിനാറ്" },
    { digit: "17", malayalam: "പതിനേഴു" },
    { digit: "18", malayalam: "പതിനെട്ട്" },
    { digit: "19", malayalam: "പത്തൊൻപത്" },
    { digit: "20", malayalam: "ഇരുപത്" },
    { digit: "21", malayalam: "ഇരുപത്തൊന്ന്" },
    { digit: "22", malayalam: "ഇരുപത്തിരണ്ട്" },
    { digit: "23", malayalam: "ഇരുപത്തിമൂന്ന്" },
    { digit: "24", malayalam: "ഇരുപത്തിനാല്" },
    { digit: "25", malayalam: "ഇരുപത്തഞ്ച്" },
    { digit: "26", malayalam: "ഇരുപത്തിയാറ്" },
    { digit: "27", malayalam: "ഇരുപത്തിയേഴു" },
    { digit: "28", malayalam: "ഇരുപത്തിയെട്ട്" },
    { digit: "29", malayalam: "ഇരുപത്തിയൊൻപത്" },
    { digit: "30", malayalam: "മുപ്പത്" },
    { digit: "31", malayalam: "മുപ്പത്തൊന്ന്" },
    { digit: "32", malayalam: "മുപ്പത്തിരണ്ട്" },
    { digit: "33", malayalam: "മുപ്പത്തിമൂന്ന്" },
    { digit: "34", malayalam: "മുപ്പത്തിനാല്" },
    { digit: "35", malayalam: "മുപ്പത്തഞ്ച്" },
    { digit: "36", malayalam: "മുപ്പത്തിയാറ്" },
    { digit: "37", malayalam: "മുപ്പത്തിയേഴു" },
    { digit: "38", malayalam: "മുപ്പത്തിയെട്ട്" },
    { digit: "39", malayalam: "മുപ്പത്തിയൊൻപത്" },
    { digit: "40", malayalam: "നല്പത്" },
    { digit: "41", malayalam: "നല്പത്തൊന്ന്" },
    { digit: "42", malayalam: "നല്പത്തിരണ്ട്" },
    { digit: "43", malayalam: "നല്പത്തിമൂന്ന്" },
    { digit: "44", malayalam: "നല്പത്തിനാല്" },
    { digit: "45", malayalam: "നല്പത്തഞ്ച്" },
    { digit: "46", malayalam: "നല്പത്തിയാറ്" },
    { digit: "47", malayalam: "നല്പത്തിയേഴു" },
    { digit: "48", malayalam: "നല്പത്തിയെട്ട്" },
    { digit: "49", malayalam: "നല്പത്തിയൊൻപത്" },
    { digit: "50", malayalam: "അൻപത്" },
    { digit: "51", malayalam: "അൻപത്തൊന്ന്" },
    { digit: "52", malayalam: "അൻപത്തിരണ്ട്" },
    { digit: "53", malayalam: "അൻപത്തിമൂന്ന്" },
    { digit: "54", malayalam: "അൻപത്തിനാല്" },
    { digit: "55", malayalam: "അൻപത്തഞ്ച്" },
    { digit: "56", malayalam: "അൻപത്തിയാറ്" },
    { digit: "57", malayalam: "അൻപത്തിയേഴു" },
    { digit: "58", malayalam: "അൻപത്തിയെട്ട്" },
    { digit: "59", malayalam: "അൻപത്തിയൊൻപത്" },
    { digit: "60", malayalam: "അറുപത്" },
    { digit: "61", malayalam: "അറുപത്തൊന്ന്" },
    { digit: "62", malayalam: "അറുപത്തിരണ്ട്" },
    { digit: "63", malayalam: "അറുപത്തിമൂന്ന്" },
    { digit: "64", malayalam: "അറുപത്തിനാല്" },
    { digit: "65", malayalam: "അറുപത്തഞ്ച്" },
    { digit: "66", malayalam: "അറുപത്തിയാറ്" },
    { digit: "67", malayalam: "അറുപത്തിയേഴു" },
    { digit: "68", malayalam: "അറുപത്തിയെട്ട്" },
    { digit: "69", malayalam: "അറുപത്തിയൊൻപത്" },
    { digit: "70", malayalam: "എഴുപത്" },
    { digit: "71", malayalam: "എഴുപത്തൊന്ന്" },
    { digit: "72", malayalam: "എഴുപത്തിരണ്ട്" },
    { digit: "73", malayalam: "എഴുപത്തിമൂന്ന്" },
    { digit: "74", malayalam: "എഴുപത്തിനാല്" },
    { digit: "75", malayalam: "എഴുപത്തഞ്ച്" },
    { digit: "76", malayalam: "എഴുപത്തിയാറ്" },
    { digit: "77", malayalam: "എഴുപത്തിയേഴു" },
    { digit: "78", malayalam: "എഴുപത്തിയെട്ട്" },
    { digit: "79", malayalam: "എഴുപത്തിയൊൻപത്" },
    { digit: "80", malayalam: "എൺപത്" },
    { digit: "81", malayalam: "എൺപത്തൊന്ന്" },
    { digit: "82", malayalam: "എൺപത്തിരണ്ട്" },
    { digit: "83", malayalam: "എൺപത്തിമൂന്ന്" },
    { digit: "84", malayalam: "എൺപത്തിനാല്" },
    { digit: "85", malayalam: "എൺപത്തഞ്ച്" },
    { digit: "86", malayalam: "എൺപത്തിയാറ്" },
    { digit: "87", malayalam: "എൺപത്തിയേഴു" },
    { digit: "88", malayalam: "എൺപത്തിയെട്ട്" },
    { digit: "89", malayalam: "എൺപത്തിയൊൻപത്" },
    { digit: "90", malayalam: "തൊണ്ണൂറ്" },
    { digit: "91", malayalam: "തൊണ്ണൂറ്റൊന്ന്" },
    { digit: "92", malayalam: "തൊണ്ണൂറ്റിരണ്ട്" },
    { digit: "93", malayalam: "തൊണ്ണൂറ്റിമൂന്ന്" },
    { digit: "94", malayalam: "തൊണ്ണൂറ്റിനാല്" },
    { digit: "95", malayalam: "തൊണ്ണൂറ്റഞ്ച്" },
    { digit: "96", malayalam: "തൊണ്ണൂറ്റിയാറ്" },
    { digit: "97", malayalam: "തൊണ്ണൂറ്റിയേഴു" },
    { digit: "98", malayalam: "തൊണ്ണൂറ്റിയെട്ട്" },
    { digit: "99", malayalam: "തൊണ്ണൂറ്റിയൊൻപത്" },
    { digit: "100", malayalam: "നൂറ്" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Malayalam number: ${numbers[index].malayalam}`);
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
            മലയാളം അക്കങ്ങൾ (Malayalam Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 1 to 100 in Malayalam
          </p>
        </div>

        {/* Numbers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-2xl font-semibold text-center">{number.malayalam}</div>
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
