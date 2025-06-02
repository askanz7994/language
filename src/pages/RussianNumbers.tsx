
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const RussianNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", russian: "ноль" },
    { digit: "1", russian: "один" },
    { digit: "2", russian: "два" },
    { digit: "3", russian: "три" },
    { digit: "4", russian: "четыре" },
    { digit: "5", russian: "пять" },
    { digit: "6", russian: "шесть" },
    { digit: "7", russian: "семь" },
    { digit: "8", russian: "восемь" },
    { digit: "9", russian: "девять" },
    { digit: "10", russian: "десять" },
    { digit: "11", russian: "одиннадцать" },
    { digit: "12", russian: "двенадцать" },
    { digit: "13", russian: "тринадцать" },
    { digit: "14", russian: "четырнадцать" },
    { digit: "15", russian: "пятнадцать" },
    { digit: "16", russian: "шестнадцать" },
    { digit: "17", russian: "семнадцать" },
    { digit: "18", russian: "восемнадцать" },
    { digit: "19", russian: "девятнадцать" },
    { digit: "20", russian: "двадцать" },
    { digit: "21", russian: "двадцать один" },
    { digit: "22", russian: "двадцать два" },
    { digit: "23", russian: "двадцать три" },
    { digit: "24", russian: "двадцать четыре" },
    { digit: "25", russian: "двадцать пять" },
    { digit: "26", russian: "двадцать шесть" },
    { digit: "27", russian: "двадцать семь" },
    { digit: "28", russian: "двадцать восемь" },
    { digit: "29", russian: "двадцать девять" },
    { digit: "30", russian: "тридцать" },
    { digit: "31", russian: "тридцать один" },
    { digit: "32", russian: "тридцать два" },
    { digit: "33", russian: "тридцать три" },
    { digit: "34", russian: "тридцать четыре" },
    { digit: "35", russian: "тридцать пять" },
    { digit: "36", russian: "тридцать шесть" },
    { digit: "37", russian: "тридцать семь" },
    { digit: "38", russian: "тридцать восемь" },
    { digit: "39", russian: "тридцать девять" },
    { digit: "40", russian: "сорок" },
    { digit: "41", russian: "сорок один" },
    { digit: "42", russian: "сорок два" },
    { digit: "43", russian: "сорок три" },
    { digit: "44", russian: "сорок четыре" },
    { digit: "45", russian: "сорок пять" },
    { digit: "46", russian: "сорок шесть" },
    { digit: "47", russian: "сорок семь" },
    { digit: "48", russian: "сорок восемь" },
    { digit: "49", russian: "сорок девять" },
    { digit: "50", russian: "пятьдесят" },
    { digit: "51", russian: "пятьдесят один" },
    { digit: "52", russian: "пятьдесят два" },
    { digit: "53", russian: "пятьдесят три" },
    { digit: "54", russian: "пятьдесят четыре" },
    { digit: "55", russian: "пятьдесят пять" },
    { digit: "56", russian: "пятьдесят шесть" },
    { digit: "57", russian: "пятьдесят семь" },
    { digit: "58", russian: "пятьдесят восемь" },
    { digit: "59", russian: "пятьдесят девять" },
    { digit: "60", russian: "шестьдесят" },
    { digit: "61", russian: "шестьдесят один" },
    { digit: "62", russian: "шестьдесят два" },
    { digit: "63", russian: "шестьдесят три" },
    { digit: "64", russian: "шестьдесят четыре" },
    { digit: "65", russian: "шестьдесят пять" },
    { digit: "66", russian: "шестьдесят шесть" },
    { digit: "67", russian: "шестьдесят семь" },
    { digit: "68", russian: "шестьдесят восемь" },
    { digit: "69", russian: "шестьдесят девять" },
    { digit: "70", russian: "семьдесят" },
    { digit: "71", russian: "семьдесят один" },
    { digit: "72", russian: "семьдесят два" },
    { digit: "73", russian: "семьдесят три" },
    { digit: "74", russian: "семьдесят четыре" },
    { digit: "75", russian: "семьдесят пять" },
    { digit: "76", russian: "семьдесят шесть" },
    { digit: "77", russian: "семьдесят семь" },
    { digit: "78", russian: "семьдесят восемь" },
    { digit: "79", russian: "семьдесят девять" },
    { digit: "80", russian: "восемьдесят" },
    { digit: "81", russian: "восемьдесят один" },
    { digit: "82", russian: "восемьдесят два" },
    { digit: "83", russian: "восемьдесят три" },
    { digit: "84", russian: "восемьдесят четыре" },
    { digit: "85", russian: "восемьдесят пять" },
    { digit: "86", russian: "восемьдесят шесть" },
    { digit: "87", russian: "восемьдесят семь" },
    { digit: "88", russian: "восемьдесят восемь" },
    { digit: "89", russian: "восемьдесят девять" },
    { digit: "90", russian: "девяносто" },
    { digit: "91", russian: "девяносто один" },
    { digit: "92", russian: "девяносто два" },
    { digit: "93", russian: "девяносто три" },
    { digit: "94", russian: "девяносто четыре" },
    { digit: "95", russian: "девяносто пять" },
    { digit: "96", russian: "девяносто шесть" },
    { digit: "97", russian: "девяносто семь" },
    { digit: "98", russian: "девяносто восемь" },
    { digit: "99", russian: "девяносто девять" },
    { digit: "100", russian: "сто" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Russian number: ${numbers[index].russian}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-russian" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Russian
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Русские Числа (Russian Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Russian
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
              <div className="text-2xl font-semibold text-center">{number.russian}</div>
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

export default RussianNumbers;
