
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const SwedishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", swedish: "noll" },
    { digit: "1", swedish: "ett" },
    { digit: "2", swedish: "två" },
    { digit: "3", swedish: "tre" },
    { digit: "4", swedish: "fyra" },
    { digit: "5", swedish: "fem" },
    { digit: "6", swedish: "sex" },
    { digit: "7", swedish: "sju" },
    { digit: "8", swedish: "åtta" },
    { digit: "9", swedish: "nio" },
    { digit: "10", swedish: "tio" },
    { digit: "11", swedish: "elva" },
    { digit: "12", swedish: "tolv" },
    { digit: "13", swedish: "tretton" },
    { digit: "14", swedish: "fjorton" },
    { digit: "15", swedish: "femton" },
    { digit: "16", swedish: "sexton" },
    { digit: "17", swedish: "sjutton" },
    { digit: "18", swedish: "arton" },
    { digit: "19", swedish: "nitton" },
    { digit: "20", swedish: "tjugo" },
    { digit: "21", swedish: "tjugoett" },
    { digit: "22", swedish: "tjugotvå" },
    { digit: "23", swedish: "tjugotre" },
    { digit: "24", swedish: "tjugofyra" },
    { digit: "25", swedish: "tjugofem" },
    { digit: "26", swedish: "tjugosex" },
    { digit: "27", swedish: "tjugosju" },
    { digit: "28", swedish: "tjugoåtta" },
    { digit: "29", swedish: "tjugonio" },
    { digit: "30", swedish: "trettio" },
    { digit: "31", swedish: "trettioett" },
    { digit: "32", swedish: "trettiotvå" },
    { digit: "33", swedish: "trettiotre" },
    { digit: "34", swedish: "trettiofyra" },
    { digit: "35", swedish: "trettiofem" },
    { digit: "36", swedish: "trettiosex" },
    { digit: "37", swedish: "trettiosju" },
    { digit: "38", swedish: "trettioåtta" },
    { digit: "39", swedish: "trettionio" },
    { digit: "40", swedish: "fyrtio" },
    { digit: "41", swedish: "fyrtioett" },
    { digit: "42", swedish: "fyrtiotvå" },
    { digit: "43", swedish: "fyrtiotre" },
    { digit: "44", swedish: "fyrtiofyra" },
    { digit: "45", swedish: "fyrtiofem" },
    { digit: "46", swedish: "fyrtiosex" },
    { digit: "47", swedish: "fyrtiosju" },
    { digit: "48", swedish: "fyrtioåtta" },
    { digit: "49", swedish: "fyrtionio" },
    { digit: "50", swedish: "femtio" },
    { digit: "51", swedish: "femtioett" },
    { digit: "52", swedish: "femtiotvå" },
    { digit: "53", swedish: "femtiotre" },
    { digit: "54", swedish: "femtiofyra" },
    { digit: "55", swedish: "femtiofem" },
    { digit: "56", swedish: "femtiosex" },
    { digit: "57", swedish: "femtiosju" },
    { digit: "58", swedish: "femtioåtta" },
    { digit: "59", swedish: "femtionio" },
    { digit: "60", swedish: "sextio" },
    { digit: "61", swedish: "sextioett" },
    { digit: "62", swedish: "sextiotvå" },
    { digit: "63", swedish: "sextiotre" },
    { digit: "64", swedish: "sextiofyra" },
    { digit: "65", swedish: "sextiofem" },
    { digit: "66", swedish: "sextiosex" },
    { digit: "67", swedish: "sextiosju" },
    { digit: "68", swedish: "sextioåtta" },
    { digit: "69", swedish: "sextionio" },
    { digit: "70", swedish: "sjuttio" },
    { digit: "71", swedish: "sjuttioett" },
    { digit: "72", swedish: "sjuttiotvå" },
    { digit: "73", swedish: "sjuttiotre" },
    { digit: "74", swedish: "sjuttiofyra" },
    { digit: "75", swedish: "sjuttiofem" },
    { digit: "76", swedish: "sjuttiosex" },
    { digit: "77", swedish: "sjuttiosju" },
    { digit: "78", swedish: "sjuttioåtta" },
    { digit: "79", swedish: "sjuttionio" },
    { digit: "80", swedish: "åttio" },
    { digit: "81", swedish: "åttioett" },
    { digit: "82", swedish: "åttiotvå" },
    { digit: "83", swedish: "åttiotre" },
    { digit: "84", swedish: "åttiofyra" },
    { digit: "85", swedish: "åttiofem" },
    { digit: "86", swedish: "åttiosex" },
    { digit: "87", swedish: "åttiosju" },
    { digit: "88", swedish: "åttioåtta" },
    { digit: "89", swedish: "åttionio" },
    { digit: "90", swedish: "nittio" },
    { digit: "91", swedish: "nittioett" },
    { digit: "92", swedish: "nittiotvå" },
    { digit: "93", swedish: "nittiotre" },
    { digit: "94", swedish: "nittiofyra" },
    { digit: "95", swedish: "nittiofem" },
    { digit: "96", swedish: "nittiosex" },
    { digit: "97", swedish: "nittiosju" },
    { digit: "98", swedish: "nittioåtta" },
    { digit: "99", swedish: "nittionio" },
    { digit: "100", swedish: "hundra" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Swedish number: ${numbers[index].swedish}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-swedish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Swedish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Svenska Siffror (Swedish Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Swedish
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
              <div className="text-2xl font-semibold text-center">{number.swedish}</div>
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

export default SwedishNumbers;
