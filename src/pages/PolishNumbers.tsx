
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const PolishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", polish: "zero" },
    { digit: "1", polish: "jeden" },
    { digit: "2", polish: "dwa" },
    { digit: "3", polish: "trzy" },
    { digit: "4", polish: "cztery" },
    { digit: "5", polish: "pięć" },
    { digit: "6", polish: "sześć" },
    { digit: "7", polish: "siedem" },
    { digit: "8", polish: "osiem" },
    { digit: "9", polish: "dziewięć" },
    { digit: "10", polish: "dziesięć" },
    { digit: "11", polish: "jedenaście" },
    { digit: "12", polish: "dwanaście" },
    { digit: "13", polish: "trzynaście" },
    { digit: "14", polish: "czternaście" },
    { digit: "15", polish: "piętnaście" },
    { digit: "16", polish: "szesnaście" },
    { digit: "17", polish: "siedemnaście" },
    { digit: "18", polish: "osiemnaście" },
    { digit: "19", polish: "dziewiętnaście" },
    { digit: "20", polish: "dwadzieścia" },
    { digit: "21", polish: "dwadzieścia jeden" },
    { digit: "22", polish: "dwadzieścia dwa" },
    { digit: "23", polish: "dwadzieścia trzy" },
    { digit: "24", polish: "dwadzieścia cztery" },
    { digit: "25", polish: "dwadzieścia pięć" },
    { digit: "26", polish: "dwadzieścia sześć" },
    { digit: "27", polish: "dwadzieścia siedem" },
    { digit: "28", polish: "dwadzieścia osiem" },
    { digit: "29", polish: "dwadzieścia dziewięć" },
    { digit: "30", polish: "trzydzieści" },
    { digit: "31", polish: "trzydzieści jeden" },
    { digit: "32", polish: "trzydzieści dwa" },
    { digit: "33", polish: "trzydzieści trzy" },
    { digit: "34", polish: "trzydzieści cztery" },
    { digit: "35", polish: "trzydzieści pięć" },
    { digit: "36", polish: "trzydzieści sześć" },
    { digit: "37", polish: "trzydzieści siedem" },
    { digit: "38", polish: "trzydzieści osiem" },
    { digit: "39", polish: "trzydzieści dziewięć" },
    { digit: "40", polish: "czterdzieści" },
    { digit: "41", polish: "czterdzieści jeden" },
    { digit: "42", polish: "czterdzieści dwa" },
    { digit: "43", polish: "czterdzieści trzy" },
    { digit: "44", polish: "czterdzieści cztery" },
    { digit: "45", polish: "czterdzieści pięć" },
    { digit: "46", polish: "czterdzieści sześć" },
    { digit: "47", polish: "czterdzieści siedem" },
    { digit: "48", polish: "czterdzieści osiem" },
    { digit: "49", polish: "czterdzieści dziewięć" },
    { digit: "50", polish: "pięćdziesiąt" },
    { digit: "51", polish: "pięćdziesiąt jeden" },
    { digit: "52", polish: "pięćdziesiąt dwa" },
    { digit: "53", polish: "pięćdziesiąt trzy" },
    { digit: "54", polish: "pięćdziesiąt cztery" },
    { digit: "55", polish: "pięćdziesiąt pięć" },
    { digit: "56", polish: "pięćdziesiąt sześć" },
    { digit: "57", polish: "pięćdziesiąt siedem" },
    { digit: "58", polish: "pięćdziesiąt osiem" },
    { digit: "59", polish: "pięćdziesiąt dziewięć" },
    { digit: "60", polish: "sześćdziesiąt" },
    { digit: "61", polish: "sześćdziesiąt jeden" },
    { digit: "62", polish: "sześćdziesiąt dwa" },
    { digit: "63", polish: "sześćdziesiąt trzy" },
    { digit: "64", polish: "sześćdziesiąt cztery" },
    { digit: "65", polish: "sześćdziesiąt pięć" },
    { digit: "66", polish: "sześćdziesiąt sześć" },
    { digit: "67", polish: "sześćdziesiąt siedem" },
    { digit: "68", polish: "sześćdziesiąt osiem" },
    { digit: "69", polish: "sześćdziesiąt dziewięć" },
    { digit: "70", polish: "siedemdziesiąt" },
    { digit: "71", polish: "siedemdziesiąt jeden" },
    { digit: "72", polish: "siedemdziesiąt dwa" },
    { digit: "73", polish: "siedemdziesiąt trzy" },
    { digit: "74", polish: "siedemdziesiąt cztery" },
    { digit: "75", polish: "siedemdziesiąt pięć" },
    { digit: "76", polish: "siedemdziesiąt sześć" },
    { digit: "77", polish: "siedemdziesiąt siedem" },
    { digit: "78", polish: "siedemdziesiąt osiem" },
    { digit: "79", polish: "siedemdziesiąt dziewięć" },
    { digit: "80", polish: "osiemdziesiąt" },
    { digit: "81", polish: "osiemdziesiąt jeden" },
    { digit: "82", polish: "osiemdziesiąt dwa" },
    { digit: "83", polish: "osiemdziesiąt trzy" },
    { digit: "84", polish: "osiemdziesiąt cztery" },
    { digit: "85", polish: "osiemdziesiąt pięć" },
    { digit: "86", polish: "osiemdziesiąt sześć" },
    { digit: "87", polish: "osiemdziesiąt siedem" },
    { digit: "88", polish: "osiemdziesiąt osiem" },
    { digit: "89", polish: "osiemdziesiąt dziewięć" },
    { digit: "90", polish: "dziewięćdziesiąt" },
    { digit: "91", polish: "dziewięćdziesiąt jeden" },
    { digit: "92", polish: "dziewięćdziesiąt dwa" },
    { digit: "93", polish: "dziewięćdziesiąt trzy" },
    { digit: "94", polish: "dziewięćdziesiąt cztery" },
    { digit: "95", polish: "dziewięćdziesiąt pięć" },
    { digit: "96", polish: "dziewięćdziesiąt sześć" },
    { digit: "97", polish: "dziewięćdziesiąt siedem" },
    { digit: "98", polish: "dziewięćdziesiąt osiem" },
    { digit: "99", polish: "dziewięćdziesiąt dziewięć" },
    { digit: "100", polish: "sto" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Polish number: ${numbers[index].polish}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-polish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Polish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Polskie Liczby (Polish Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Polish
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
              <div className="text-2xl font-semibold text-center">{number.polish}</div>
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

export default PolishNumbers;
