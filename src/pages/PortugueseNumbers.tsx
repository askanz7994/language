
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const PortugueseNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", portuguese: "zero" },
    { digit: "1", portuguese: "um" },
    { digit: "2", portuguese: "dois" },
    { digit: "3", portuguese: "três" },
    { digit: "4", portuguese: "quatro" },
    { digit: "5", portuguese: "cinco" },
    { digit: "6", portuguese: "seis" },
    { digit: "7", portuguese: "sete" },
    { digit: "8", portuguese: "oito" },
    { digit: "9", portuguese: "nove" },
    { digit: "10", portuguese: "dez" },
    { digit: "11", portuguese: "onze" },
    { digit: "12", portuguese: "doze" },
    { digit: "13", portuguese: "treze" },
    { digit: "14", portuguese: "catorze" },
    { digit: "15", portuguese: "quinze" },
    { digit: "16", portuguese: "dezesseis" },
    { digit: "17", portuguese: "dezessete" },
    { digit: "18", portuguese: "dezoito" },
    { digit: "19", portuguese: "dezenove" },
    { digit: "20", portuguese: "vinte" },
    { digit: "21", portuguese: "vinte e um" },
    { digit: "22", portuguese: "vinte e dois" },
    { digit: "23", portuguese: "vinte e três" },
    { digit: "24", portuguese: "vinte e quatro" },
    { digit: "25", portuguese: "vinte e cinco" },
    { digit: "26", portuguese: "vinte e seis" },
    { digit: "27", portuguese: "vinte e sete" },
    { digit: "28", portuguese: "vinte e oito" },
    { digit: "29", portuguese: "vinte e nove" },
    { digit: "30", portuguese: "trinta" },
    { digit: "31", portuguese: "trinta e um" },
    { digit: "32", portuguese: "trinta e dois" },
    { digit: "33", portuguese: "trinta e três" },
    { digit: "34", portuguese: "trinta e quatro" },
    { digit: "35", portuguese: "trinta e cinco" },
    { digit: "36", portuguese: "trinta e seis" },
    { digit: "37", portuguese: "trinta e sete" },
    { digit: "38", portuguese: "trinta e oito" },
    { digit: "39", portuguese: "trinta e nove" },
    { digit: "40", portuguese: "quarenta" },
    { digit: "41", portuguese: "quarenta e um" },
    { digit: "42", portuguese: "quarenta e dois" },
    { digit: "43", portuguese: "quarenta e três" },
    { digit: "44", portuguese: "quarenta e quatro" },
    { digit: "45", portuguese: "quarenta e cinco" },
    { digit: "46", portuguese: "quarenta e seis" },
    { digit: "47", portuguese: "quarenta e sete" },
    { digit: "48", portuguese: "quarenta e oito" },
    { digit: "49", portuguese: "quarenta e nove" },
    { digit: "50", portuguese: "cinquenta" },
    { digit: "51", portuguese: "cinquenta e um" },
    { digit: "52", portuguese: "cinquenta e dois" },
    { digit: "53", portuguese: "cinquenta e três" },
    { digit: "54", portuguese: "cinquenta e quatro" },
    { digit: "55", portuguese: "cinquenta e cinco" },
    { digit: "56", portuguese: "cinquenta e seis" },
    { digit: "57", portuguese: "cinquenta e sete" },
    { digit: "58", portuguese: "cinquenta e oito" },
    { digit: "59", portuguese: "cinquenta e nove" },
    { digit: "60", portuguese: "sessenta" },
    { digit: "61", portuguese: "sessenta e um" },
    { digit: "62", portuguese: "sessenta e dois" },
    { digit: "63", portuguese: "sessenta e três" },
    { digit: "64", portuguese: "sessenta e quatro" },
    { digit: "65", portuguese: "sessenta e cinco" },
    { digit: "66", portuguese: "sessenta e seis" },
    { digit: "67", portuguese: "sessenta e sete" },
    { digit: "68", portuguese: "sessenta e oito" },
    { digit: "69", portuguese: "sessenta e nove" },
    { digit: "70", portuguese: "setenta" },
    { digit: "71", portuguese: "setenta e um" },
    { digit: "72", portuguese: "setenta e dois" },
    { digit: "73", portuguese: "setenta e três" },
    { digit: "74", portuguese: "setenta e quatro" },
    { digit: "75", portuguese: "setenta e cinco" },
    { digit: "76", portuguese: "setenta e seis" },
    { digit: "77", portuguese: "setenta e sete" },
    { digit: "78", portuguese: "setenta e oito" },
    { digit: "79", portuguese: "setenta e nove" },
    { digit: "80", portuguese: "oitenta" },
    { digit: "81", portuguese: "oitenta e um" },
    { digit: "82", portuguese: "oitenta e dois" },
    { digit: "83", portuguese: "oitenta e três" },
    { digit: "84", portuguese: "oitenta e quatro" },
    { digit: "85", portuguese: "oitenta e cinco" },
    { digit: "86", portuguese: "oitenta e seis" },
    { digit: "87", portuguese: "oitenta e sete" },
    { digit: "88", portuguese: "oitenta e oito" },
    { digit: "89", portuguese: "oitenta e nove" },
    { digit: "90", portuguese: "noventa" },
    { digit: "91", portuguese: "noventa e um" },
    { digit: "92", portuguese: "noventa e dois" },
    { digit: "93", portuguese: "noventa e três" },
    { digit: "94", portuguese: "noventa e quatro" },
    { digit: "95", portuguese: "noventa e cinco" },
    { digit: "96", portuguese: "noventa e seis" },
    { digit: "97", portuguese: "noventa e sete" },
    { digit: "98", portuguese: "noventa e oito" },
    { digit: "99", portuguese: "noventa e nove" },
    { digit: "100", portuguese: "cem" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Portuguese number: ${numbers[index].portuguese}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-portuguese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portuguese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Números em Português (Portuguese Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Portuguese
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
              <div className="text-2xl font-semibold text-center">{number.portuguese}</div>
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

export default PortugueseNumbers;
