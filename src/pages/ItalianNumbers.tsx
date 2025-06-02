
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ItalianNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", italian: "zero" },
    { digit: "1", italian: "uno" },
    { digit: "2", italian: "due" },
    { digit: "3", italian: "tre" },
    { digit: "4", italian: "quattro" },
    { digit: "5", italian: "cinque" },
    { digit: "6", italian: "sei" },
    { digit: "7", italian: "sette" },
    { digit: "8", italian: "otto" },
    { digit: "9", italian: "nove" },
    { digit: "10", italian: "dieci" },
    { digit: "11", italian: "undici" },
    { digit: "12", italian: "dodici" },
    { digit: "13", italian: "tredici" },
    { digit: "14", italian: "quattordici" },
    { digit: "15", italian: "quindici" },
    { digit: "16", italian: "sedici" },
    { digit: "17", italian: "diciassette" },
    { digit: "18", italian: "diciotto" },
    { digit: "19", italian: "diciannove" },
    { digit: "20", italian: "venti" },
    { digit: "21", italian: "ventuno" },
    { digit: "22", italian: "ventidue" },
    { digit: "23", italian: "ventitré" },
    { digit: "24", italian: "ventiquattro" },
    { digit: "25", italian: "venticinque" },
    { digit: "26", italian: "ventisei" },
    { digit: "27", italian: "ventisette" },
    { digit: "28", italian: "ventotto" },
    { digit: "29", italian: "ventinove" },
    { digit: "30", italian: "trenta" },
    { digit: "31", italian: "trentuno" },
    { digit: "32", italian: "trentadue" },
    { digit: "33", italian: "trentatré" },
    { digit: "34", italian: "trentaquattro" },
    { digit: "35", italian: "trentacinque" },
    { digit: "36", italian: "trentasei" },
    { digit: "37", italian: "trentasette" },
    { digit: "38", italian: "trentotto" },
    { digit: "39", italian: "trentanove" },
    { digit: "40", italian: "quaranta" },
    { digit: "41", italian: "quarantuno" },
    { digit: "42", italian: "quarantadue" },
    { digit: "43", italian: "quarantatré" },
    { digit: "44", italian: "quarantaquattro" },
    { digit: "45", italian: "quarantacinque" },
    { digit: "46", italian: "quarantasei" },
    { digit: "47", italian: "quarantasette" },
    { digit: "48", italian: "quarantotto" },
    { digit: "49", italian: "quarantanove" },
    { digit: "50", italian: "cinquanta" },
    { digit: "51", italian: "cinquantuno" },
    { digit: "52", italian: "cinquantadue" },
    { digit: "53", italian: "cinquantatré" },
    { digit: "54", italian: "cinquantaquattro" },
    { digit: "55", italian: "cinquantacinque" },
    { digit: "56", italian: "cinquantasei" },
    { digit: "57", italian: "cinquantasette" },
    { digit: "58", italian: "cinquantotto" },
    { digit: "59", italian: "cinquantanove" },
    { digit: "60", italian: "sessanta" },
    { digit: "61", italian: "sessantuno" },
    { digit: "62", italian: "sessantadue" },
    { digit: "63", italian: "sessantatré" },
    { digit: "64", italian: "sessantaquattro" },
    { digit: "65", italian: "sessantacinque" },
    { digit: "66", italian: "sessantasei" },
    { digit: "67", italian: "sessantasette" },
    { digit: "68", italian: "sessantotto" },
    { digit: "69", italian: "sessantanove" },
    { digit: "70", italian: "settanta" },
    { digit: "71", italian: "settantuno" },
    { digit: "72", italian: "settantadue" },
    { digit: "73", italian: "settantatré" },
    { digit: "74", italian: "settantaquattro" },
    { digit: "75", italian: "settantacinque" },
    { digit: "76", italian: "settantasei" },
    { digit: "77", italian: "settantasette" },
    { digit: "78", italian: "settantotto" },
    { digit: "79", italian: "settantanove" },
    { digit: "80", italian: "ottanta" },
    { digit: "81", italian: "ottantuno" },
    { digit: "82", italian: "ottantadue" },
    { digit: "83", italian: "ottantatré" },
    { digit: "84", italian: "ottantaquattro" },
    { digit: "85", italian: "ottantacinque" },
    { digit: "86", italian: "ottantasei" },
    { digit: "87", italian: "ottantasette" },
    { digit: "88", italian: "ottantotto" },
    { digit: "89", italian: "ottantanove" },
    { digit: "90", italian: "novanta" },
    { digit: "91", italian: "novantuno" },
    { digit: "92", italian: "novantadue" },
    { digit: "93", italian: "novantatré" },
    { digit: "94", italian: "novantaquattro" },
    { digit: "95", italian: "novantacinque" },
    { digit: "96", italian: "novantasei" },
    { digit: "97", italian: "novantasette" },
    { digit: "98", italian: "novantotto" },
    { digit: "99", italian: "novantanove" },
    { digit: "100", italian: "cento" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Italian number: ${numbers[index].italian}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-italian" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Italian
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Numeri Italiani (Italian Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Italian
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
              <div className="text-2xl font-semibold text-center">{number.italian}</div>
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

export default ItalianNumbers;
