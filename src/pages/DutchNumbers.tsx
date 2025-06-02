
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const DutchNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", dutch: "nul" },
    { digit: "1", dutch: "een" },
    { digit: "2", dutch: "twee" },
    { digit: "3", dutch: "drie" },
    { digit: "4", dutch: "vier" },
    { digit: "5", dutch: "vijf" },
    { digit: "6", dutch: "zes" },
    { digit: "7", dutch: "zeven" },
    { digit: "8", dutch: "acht" },
    { digit: "9", dutch: "negen" },
    { digit: "10", dutch: "tien" },
    { digit: "11", dutch: "elf" },
    { digit: "12", dutch: "twaalf" },
    { digit: "13", dutch: "dertien" },
    { digit: "14", dutch: "veertien" },
    { digit: "15", dutch: "vijftien" },
    { digit: "16", dutch: "zestien" },
    { digit: "17", dutch: "zeventien" },
    { digit: "18", dutch: "achttien" },
    { digit: "19", dutch: "negentien" },
    { digit: "20", dutch: "twintig" },
    { digit: "21", dutch: "eenentwintig" },
    { digit: "22", dutch: "tweeëntwintig" },
    { digit: "23", dutch: "drieëntwintig" },
    { digit: "24", dutch: "vierentwintig" },
    { digit: "25", dutch: "vijfentwintig" },
    { digit: "26", dutch: "zesentwintig" },
    { digit: "27", dutch: "zevenentwintig" },
    { digit: "28", dutch: "achtentwintig" },
    { digit: "29", dutch: "negenentwintig" },
    { digit: "30", dutch: "dertig" },
    { digit: "31", dutch: "eenendertig" },
    { digit: "32", dutch: "tweeëndertig" },
    { digit: "33", dutch: "drieëndertig" },
    { digit: "34", dutch: "vierendertig" },
    { digit: "35", dutch: "vijfendertig" },
    { digit: "36", dutch: "zesendertig" },
    { digit: "37", dutch: "zevenendertig" },
    { digit: "38", dutch: "achtendertig" },
    { digit: "39", dutch: "negenendertig" },
    { digit: "40", dutch: "veertig" },
    { digit: "41", dutch: "eenenveertig" },
    { digit: "42", dutch: "tweeënveertig" },
    { digit: "43", dutch: "drieënveertig" },
    { digit: "44", dutch: "vierenveertig" },
    { digit: "45", dutch: "vijfenveertig" },
    { digit: "46", dutch: "zesenveertig" },
    { digit: "47", dutch: "zevenenveertig" },
    { digit: "48", dutch: "achtenveertig" },
    { digit: "49", dutch: "negenenveertig" },
    { digit: "50", dutch: "vijftig" },
    { digit: "51", dutch: "eenenvijftig" },
    { digit: "52", dutch: "tweeënvijftig" },
    { digit: "53", dutch: "drieënvijftig" },
    { digit: "54", dutch: "vierenvijftig" },
    { digit: "55", dutch: "vijfenvijftig" },
    { digit: "56", dutch: "zesenvijftig" },
    { digit: "57", dutch: "zevenenvijftig" },
    { digit: "58", dutch: "achtenvijftig" },
    { digit: "59", dutch: "negenenvijftig" },
    { digit: "60", dutch: "zestig" },
    { digit: "61", dutch: "eenenzestig" },
    { digit: "62", dutch: "tweeënzestig" },
    { digit: "63", dutch: "drieënzestig" },
    { digit: "64", dutch: "vierenzestig" },
    { digit: "65", dutch: "vijfenzestig" },
    { digit: "66", dutch: "zesenzestig" },
    { digit: "67", dutch: "zevenenzestig" },
    { digit: "68", dutch: "achtenzestig" },
    { digit: "69", dutch: "negenenzestig" },
    { digit: "70", dutch: "zeventig" },
    { digit: "71", dutch: "eenenzeventig" },
    { digit: "72", dutch: "tweeënzeventig" },
    { digit: "73", dutch: "drieënzeventig" },
    { digit: "74", dutch: "vierenzeventig" },
    { digit: "75", dutch: "vijfenzeventig" },
    { digit: "76", dutch: "zesenzeventig" },
    { digit: "77", dutch: "zevenenzeventig" },
    { digit: "78", dutch: "achtenzeventig" },
    { digit: "79", dutch: "negenenzeventig" },
    { digit: "80", dutch: "tachtig" },
    { digit: "81", dutch: "eenentachtig" },
    { digit: "82", dutch: "tweeëntachtig" },
    { digit: "83", dutch: "drieëntachtig" },
    { digit: "84", dutch: "vierentachtig" },
    { digit: "85", dutch: "vijfentachtig" },
    { digit: "86", dutch: "zesentachtig" },
    { digit: "87", dutch: "zevenentachtig" },
    { digit: "88", dutch: "achtentachtig" },
    { digit: "89", dutch: "negenentachtig" },
    { digit: "90", dutch: "negentig" },
    { digit: "91", dutch: "eenennegentig" },
    { digit: "92", dutch: "tweeënnegentig" },
    { digit: "93", dutch: "drieënnegentig" },
    { digit: "94", dutch: "vierennegentig" },
    { digit: "95", dutch: "vijfennegentig" },
    { digit: "96", dutch: "zesennegentig" },
    { digit: "97", dutch: "zevenennegentig" },
    { digit: "98", dutch: "achtennegentig" },
    { digit: "99", dutch: "negenennegentig" },
    { digit: "100", dutch: "honderd" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Dutch number: ${numbers[index].dutch}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-dutch" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dutch
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nederlandse Nummers (Dutch Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Dutch
          </p>
        </div>

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
              <div className="text-2xl font-semibold text-center">{number.dutch}</div>
            </div>
          ))}
        </div>

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

export default DutchNumbers;
