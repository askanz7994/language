
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const SpanishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", spanish: "cero" },
    { digit: "1", spanish: "uno" },
    { digit: "2", spanish: "dos" },
    { digit: "3", spanish: "tres" },
    { digit: "4", spanish: "cuatro" },
    { digit: "5", spanish: "cinco" },
    { digit: "6", spanish: "seis" },
    { digit: "7", spanish: "siete" },
    { digit: "8", spanish: "ocho" },
    { digit: "9", spanish: "nueve" },
    { digit: "10", spanish: "diez" },
    { digit: "11", spanish: "once" },
    { digit: "12", spanish: "doce" },
    { digit: "13", spanish: "trece" },
    { digit: "14", spanish: "catorce" },
    { digit: "15", spanish: "quince" },
    { digit: "16", spanish: "dieciséis" },
    { digit: "17", spanish: "diecisiete" },
    { digit: "18", spanish: "dieciocho" },
    { digit: "19", spanish: "diecinueve" },
    { digit: "20", spanish: "veinte" },
    { digit: "21", spanish: "veintiuno" },
    { digit: "22", spanish: "veintidós" },
    { digit: "23", spanish: "veintitrés" },
    { digit: "24", spanish: "veinticuatro" },
    { digit: "25", spanish: "veinticinco" },
    { digit: "26", spanish: "veintiséis" },
    { digit: "27", spanish: "veintisiete" },
    { digit: "28", spanish: "veintiocho" },
    { digit: "29", spanish: "veintinueve" },
    { digit: "30", spanish: "treinta" },
    { digit: "31", spanish: "treinta y uno" },
    { digit: "32", spanish: "treinta y dos" },
    { digit: "33", spanish: "treinta y tres" },
    { digit: "34", spanish: "treinta y cuatro" },
    { digit: "35", spanish: "treinta y cinco" },
    { digit: "36", spanish: "treinta y seis" },
    { digit: "37", spanish: "treinta y siete" },
    { digit: "38", spanish: "treinta y ocho" },
    { digit: "39", spanish: "treinta y nueve" },
    { digit: "40", spanish: "cuarenta" },
    { digit: "41", spanish: "cuarenta y uno" },
    { digit: "42", spanish: "cuarenta y dos" },
    { digit: "43", spanish: "cuarenta y tres" },
    { digit: "44", spanish: "cuarenta y cuatro" },
    { digit: "45", spanish: "cuarenta y cinco" },
    { digit: "46", spanish: "cuarenta y seis" },
    { digit: "47", spanish: "cuarenta y siete" },
    { digit: "48", spanish: "cuarenta y ocho" },
    { digit: "49", spanish: "cuarenta y nueve" },
    { digit: "50", spanish: "cincuenta" },
    { digit: "51", spanish: "cincuenta y uno" },
    { digit: "52", spanish: "cincuenta y dos" },
    { digit: "53", spanish: "cincuenta y tres" },
    { digit: "54", spanish: "cincuenta y cuatro" },
    { digit: "55", spanish: "cincuenta y cinco" },
    { digit: "56", spanish: "cincuenta y seis" },
    { digit: "57", spanish: "cincuenta y siete" },
    { digit: "58", spanish: "cincuenta y ocho" },
    { digit: "59", spanish: "cincuenta y nueve" },
    { digit: "60", spanish: "sesenta" },
    { digit: "61", spanish: "sesenta y uno" },
    { digit: "62", spanish: "sesenta y dos" },
    { digit: "63", spanish: "sesenta y tres" },
    { digit: "64", spanish: "sesenta y cuatro" },
    { digit: "65", spanish: "sesenta y cinco" },
    { digit: "66", spanish: "sesenta y seis" },
    { digit: "67", spanish: "sesenta y siete" },
    { digit: "68", spanish: "sesenta y ocho" },
    { digit: "69", spanish: "sesenta y nueve" },
    { digit: "70", spanish: "setenta" },
    { digit: "71", spanish: "setenta y uno" },
    { digit: "72", spanish: "setenta y dos" },
    { digit: "73", spanish: "setenta y tres" },
    { digit: "74", spanish: "setenta y cuatro" },
    { digit: "75", spanish: "setenta y cinco" },
    { digit: "76", spanish: "setenta y seis" },
    { digit: "77", spanish: "setenta y siete" },
    { digit: "78", spanish: "setenta y ocho" },
    { digit: "79", spanish: "setenta y nueve" },
    { digit: "80", spanish: "ochenta" },
    { digit: "81", spanish: "ochenta y uno" },
    { digit: "82", spanish: "ochenta y dos" },
    { digit: "83", spanish: "ochenta y tres" },
    { digit: "84", spanish: "ochenta y cuatro" },
    { digit: "85", spanish: "ochenta y cinco" },
    { digit: "86", spanish: "ochenta y seis" },
    { digit: "87", spanish: "ochenta y siete" },
    { digit: "88", spanish: "ochenta y ocho" },
    { digit: "89", spanish: "ochenta y nueve" },
    { digit: "90", spanish: "noventa" },
    { digit: "91", spanish: "noventa y uno" },
    { digit: "92", spanish: "noventa y dos" },
    { digit: "93", spanish: "noventa y tres" },
    { digit: "94", spanish: "noventa y cuatro" },
    { digit: "95", spanish: "noventa y cinco" },
    { digit: "96", spanish: "noventa y seis" },
    { digit: "97", spanish: "noventa y siete" },
    { digit: "98", spanish: "noventa y ocho" },
    { digit: "99", spanish: "noventa y nueve" },
    { digit: "100", spanish: "cien" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Spanish number: ${numbers[index].spanish}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-spanish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Spanish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Números en Español (Spanish Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Spanish
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
              <div className="text-2xl font-semibold text-center">{number.spanish}</div>
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

export default SpanishNumbers;
