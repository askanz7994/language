
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const KannadaNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", kannada: "ಶೂನ್ಯ" },
    { digit: "1", kannada: "ಒಂದು" },
    { digit: "2", kannada: "ಎರಡು" },
    { digit: "3", kannada: "ಮೂರು" },
    { digit: "4", kannada: "ನಾಲ್ಕು" },
    { digit: "5", kannada: "ಐದು" },
    { digit: "6", kannada: "ಆರು" },
    { digit: "7", kannada: "ಏಳು" },
    { digit: "8", kannada: "ಎಂಟು" },
    { digit: "9", kannada: "ಒಂಬತ್ತು" },
    { digit: "10", kannada: "ಹತ್ತು" },
    { digit: "11", kannada: "ಹನ್ನೊಂದು" },
    { digit: "12", kannada: "ಹನ್ನೆರಡು" },
    { digit: "13", kannada: "ಹದಿಮೂರು" },
    { digit: "14", kannada: "ಹದಿನಾಲ್ಕು" },
    { digit: "15", kannada: "ಹದಿನೈದು" },
    { digit: "16", kannada: "ಹದಿನಾರು" },
    { digit: "17", kannada: "ಹದಿನೇಳು" },
    { digit: "18", kannada: "ಹದಿನೆಂಟು" },
    { digit: "19", kannada: "ಹತ್ತೊಂಬತ್ತು" },
    { digit: "20", kannada: "ಇಪ್ಪತ್ತು" },
    { digit: "21", kannada: "ಇಪ್ಪತ್ತೊಂದು" },
    { digit: "22", kannada: "ಇಪ್ಪತ್ತೆರಡು" },
    { digit: "23", kannada: "ಇಪ್ಪತ್ತಮೂರು" },
    { digit: "24", kannada: "ಇಪ್ಪತ್ತನಾಲ್ಕು" },
    { digit: "25", kannada: "ಇಪ್ಪತ್ತೈದು" },
    { digit: "26", kannada: "ಇಪ್ಪತ್ತಾರು" },
    { digit: "27", kannada: "ಇಪ್ಪತ್ತೇಳು" },
    { digit: "28", kannada: "ಇಪ್ಪತ್ತೆಂಟು" },
    { digit: "29", kannada: "ಇಪ್ಪತ್ತೊಂಬತ್ತು" },
    { digit: "30", kannada: "ಮೂವತ್ತು" },
    { digit: "31", kannada: "ಮೂವತ್ತೊಂದು" },
    { digit: "32", kannada: "ಮೂವತ್ತೆರಡು" },
    { digit: "33", kannada: "ಮೂವತ್ತಮೂರು" },
    { digit: "34", kannada: "ಮೂವತ್ತನಾಲ್ಕು" },
    { digit: "35", kannada: "ಮೂವತ್ತೈದು" },
    { digit: "36", kannada: "ಮೂವತ್ತಾರು" },
    { digit: "37", kannada: "ಮೂವತ್ತೇಳು" },
    { digit: "38", kannada: "ಮೂವತ್ತೆಂಟು" },
    { digit: "39", kannada: "ಮೂವತ್ತೊಂಬತ್ತು" },
    { digit: "40", kannada: "ನಲವತ್ತು" },
    { digit: "41", kannada: "ನಲವತ್ತೊಂದು" },
    { digit: "42", kannada: "ನಲವತ್ತೆರಡು" },
    { digit: "43", kannada: "ನಲವತ್ತಮೂರು" },
    { digit: "44", kannada: "ನಲವತ್ತನಾಲ್ಕು" },
    { digit: "45", kannada: "ನಲವತ್ತೈದು" },
    { digit: "46", kannada: "ನಲವತ್ತಾರು" },
    { digit: "47", kannada: "ನಲವತ್ತೇಳು" },
    { digit: "48", kannada: "ನಲವತ್ತೆಂಟು" },
    { digit: "49", kannada: "ನಲವತ್ತೊಂಬತ್ತು" },
    { digit: "50", kannada: "ಐವತ್ತು" },
    { digit: "51", kannada: "ಐವತ್ತೊಂದು" },
    { digit: "52", kannada: "ಐವತ್ತೆರಡು" },
    { digit: "53", kannada: "ಐವತ್ತಮೂರು" },
    { digit: "54", kannada: "ಐವತ್ತನಾಲ್ಕು" },
    { digit: "55", kannada: "ಐವತ್ತೈದು" },
    { digit: "56", kannada: "ಐವತ್ತಾರು" },
    { digit: "57", kannada: "ಐವತ್ತೇಳು" },
    { digit: "58", kannada: "ಐವತ್ತೆಂಟು" },
    { digit: "59", kannada: "ಐವತ್ತೊಂಬತ್ತು" },
    { digit: "60", kannada: "ಅರವತ್ತು" },
    { digit: "61", kannada: "ಅರವತ್ತೊಂದು" },
    { digit: "62", kannada: "ಅರವತ್ತೆರಡು" },
    { digit: "63", kannada: "ಅರವತ್ತಮೂರು" },
    { digit: "64", kannada: "ಅರವತ್ತನಾಲ್ಕು" },
    { digit: "65", kannada: "ಅರವತ್ತೈದು" },
    { digit: "66", kannada: "ಅರವತ್ತಾರು" },
    { digit: "67", kannada: "ಅರವತ್ತೇಳು" },
    { digit: "68", kannada: "ಅರವತ್ತೆಂಟು" },
    { digit: "69", kannada: "ಅರವತ್ತೊಂಬತ್ತು" },
    { digit: "70", kannada: "ಎಪ್ಪತ್ತು" },
    { digit: "71", kannada: "ಎಪ್ಪತ್ತೊಂದು" },
    { digit: "72", kannada: "ಎಪ್ಪತ್ತೆರಡು" },
    { digit: "73", kannada: "ಎಪ್ಪತ್ತಮೂರು" },
    { digit: "74", kannada: "ಎಪ್ಪತ್ತನಾಲ್ಕು" },
    { digit: "75", kannada: "ಎಪ್ಪತ್ತೈದು" },
    { digit: "76", kannada: "ಎಪ್ಪತ್ತಾರು" },
    { digit: "77", kannada: "ಎಪ್ಪತ್ತೇಳು" },
    { digit: "78", kannada: "ಎಪ್ಪತ್ತೆಂಟು" },
    { digit: "79", kannada: "ಎಪ್ಪತ್ತೊಂಬತ್ತು" },
    { digit: "80", kannada: "ಎಂಬತ್ತು" },
    { digit: "81", kannada: "ಎಂಬತ್ತೊಂದು" },
    { digit: "82", kannada: "ಎಂಬತ್ತೆರಡು" },
    { digit: "83", kannada: "ಎಂಬತ್ತಮೂರು" },
    { digit: "84", kannada: "ಎಂಬತ್ತನಾಲ್ಕು" },
    { digit: "85", kannada: "ಎಂಬತ್ತೈದು" },
    { digit: "86", kannada: "ಎಂಬತ್ತಾರು" },
    { digit: "87", kannada: "ಎಂಬತ್ತೇಳು" },
    { digit: "88", kannada: "ಎಂಬತ್ತೆಂಟು" },
    { digit: "89", kannada: "ಎಂಬತ್ತೊಂಬತ್ತು" },
    { digit: "90", kannada: "ತೊಂಬತ್ತು" },
    { digit: "91", kannada: "ತೊಂಬತ್ತೊಂದು" },
    { digit: "92", kannada: "ತೊಂಬತ್ತೆರಡು" },
    { digit: "93", kannada: "ತೊಂಬತ್ತಮೂರು" },
    { digit: "94", kannada: "ತೊಂಬತ್ತನಾಲ್ಕು" },
    { digit: "95", kannada: "ತೊಂಬತ್ತೈದು" },
    { digit: "96", kannada: "ತೊಂಬತ್ತಾರು" },
    { digit: "97", kannada: "ತೊಂಬತ್ತೇಳು" },
    { digit: "98", kannada: "ತೊಂಬತ್ತೆಂಟು" },
    { digit: "99", kannada: "ತೊಂಬತ್ತೊಂಬತ್ತು" },
    { digit: "100", kannada: "ನೂರು" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Kannada number: ${numbers[index].kannada}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-kannada" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Kannada
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ಕನ್ನಡ ಸಂಖ್ಯೆಗಳು (Kannada Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Kannada
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
              <div className="text-2xl font-semibold text-center">{number.kannada}</div>
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

export default KannadaNumbers;
