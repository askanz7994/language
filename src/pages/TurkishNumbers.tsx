
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const TurkishNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", turkish: "sıfır" },
    { digit: "1", turkish: "bir" },
    { digit: "2", turkish: "iki" },
    { digit: "3", turkish: "üç" },
    { digit: "4", turkish: "dört" },
    { digit: "5", turkish: "beş" },
    { digit: "6", turkish: "altı" },
    { digit: "7", turkish: "yedi" },
    { digit: "8", turkish: "sekiz" },
    { digit: "9", turkish: "dokuz" },
    { digit: "10", turkish: "on" },
    { digit: "11", turkish: "on bir" },
    { digit: "12", turkish: "on iki" },
    { digit: "13", turkish: "on üç" },
    { digit: "14", turkish: "on dört" },
    { digit: "15", turkish: "on beş" },
    { digit: "16", turkish: "on altı" },
    { digit: "17", turkish: "on yedi" },
    { digit: "18", turkish: "on sekiz" },
    { digit: "19", turkish: "on dokuz" },
    { digit: "20", turkish: "yirmi" },
    { digit: "21", turkish: "yirmi bir" },
    { digit: "22", turkish: "yirmi iki" },
    { digit: "23", turkish: "yirmi üç" },
    { digit: "24", turkish: "yirmi dört" },
    { digit: "25", turkish: "yirmi beş" },
    { digit: "26", turkish: "yirmi altı" },
    { digit: "27", turkish: "yirmi yedi" },
    { digit: "28", turkish: "yirmi sekiz" },
    { digit: "29", turkish: "yirmi dokuz" },
    { digit: "30", turkish: "otuz" },
    { digit: "31", turkish: "otuz bir" },
    { digit: "32", turkish: "otuz iki" },
    { digit: "33", turkish: "otuz üç" },
    { digit: "34", turkish: "otuz dört" },
    { digit: "35", turkish: "otuz beş" },
    { digit: "36", turkish: "otuz altı" },
    { digit: "37", turkish: "otuz yedi" },
    { digit: "38", turkish: "otuz sekiz" },
    { digit: "39", turkish: "otuz dokuz" },
    { digit: "40", turkish: "kırk" },
    { digit: "41", turkish: "kırk bir" },
    { digit: "42", turkish: "kırk iki" },
    { digit: "43", turkish: "kırk üç" },
    { digit: "44", turkish: "kırk dört" },
    { digit: "45", turkish: "kırk beş" },
    { digit: "46", turkish: "kırk altı" },
    { digit: "47", turkish: "kırk yedi" },
    { digit: "48", turkish: "kırk sekiz" },
    { digit: "49", turkish: "kırk dokuz" },
    { digit: "50", turkish: "elli" },
    { digit: "51", turkish: "elli bir" },
    { digit: "52", turkish: "elli iki" },
    { digit: "53", turkish: "elli üç" },
    { digit: "54", turkish: "elli dört" },
    { digit: "55", turkish: "elli beş" },
    { digit: "56", turkish: "elli altı" },
    { digit: "57", turkish: "elli yedi" },
    { digit: "58", turkish: "elli sekiz" },
    { digit: "59", turkish: "elli dokuz" },
    { digit: "60", turkish: "altmış" },
    { digit: "61", turkish: "altmış bir" },
    { digit: "62", turkish: "altmış iki" },
    { digit: "63", turkish: "altmış üç" },
    { digit: "64", turkish: "altmış dört" },
    { digit: "65", turkish: "altmış beş" },
    { digit: "66", turkish: "altmış altı" },
    { digit: "67", turkish: "altmış yedi" },
    { digit: "68", turkish: "altmış sekiz" },
    { digit: "69", turkish: "altmış dokuz" },
    { digit: "70", turkish: "yetmiş" },
    { digit: "71", turkish: "yetmiş bir" },
    { digit: "72", turkish: "yetmiş iki" },
    { digit: "73", turkish: "yetmiş üç" },
    { digit: "74", turkish: "yetmiş dört" },
    { digit: "75", turkish: "yetmiş beş" },
    { digit: "76", turkish: "yetmiş altı" },
    { digit: "77", turkish: "yetmiş yedi" },
    { digit: "78", turkish: "yetmiş sekiz" },
    { digit: "79", turkish: "yetmiş dokuz" },
    { digit: "80", turkish: "seksen" },
    { digit: "81", turkish: "seksen bir" },
    { digit: "82", turkish: "seksen iki" },
    { digit: "83", turkish: "seksen üç" },
    { digit: "84", turkish: "seksen dört" },
    { digit: "85", turkish: "seksen beş" },
    { digit: "86", turkish: "seksen altı" },
    { digit: "87", turkish: "seksen yedi" },
    { digit: "88", turkish: "seksen sekiz" },
    { digit: "89", turkish: "seksen dokuz" },
    { digit: "90", turkish: "doksan" },
    { digit: "91", turkish: "doksan bir" },
    { digit: "92", turkish: "doksan iki" },
    { digit: "93", turkish: "doksan üç" },
    { digit: "94", turkish: "doksan dört" },
    { digit: "95", turkish: "doksan beş" },
    { digit: "96", turkish: "doksan altı" },
    { digit: "97", turkish: "doksan yedi" },
    { digit: "98", turkish: "doksan sekiz" },
    { digit: "99", turkish: "doksan dokuz" },
    { digit: "100", turkish: "yüz" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Turkish number: ${numbers[index].turkish}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-turkish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Turkish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Türkçe Sayılar (Turkish Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Turkish
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
              <div className="text-2xl font-semibold text-center">{number.turkish}</div>
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

export default TurkishNumbers;
