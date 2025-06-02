
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const IndonesianNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", indonesian: "nol" },
    { digit: "1", indonesian: "satu" },
    { digit: "2", indonesian: "dua" },
    { digit: "3", indonesian: "tiga" },
    { digit: "4", indonesian: "empat" },
    { digit: "5", indonesian: "lima" },
    { digit: "6", indonesian: "enam" },
    { digit: "7", indonesian: "tujuh" },
    { digit: "8", indonesian: "delapan" },
    { digit: "9", indonesian: "sembilan" },
    { digit: "10", indonesian: "sepuluh" },
    { digit: "11", indonesian: "sebelas" },
    { digit: "12", indonesian: "dua belas" },
    { digit: "13", indonesian: "tiga belas" },
    { digit: "14", indonesian: "empat belas" },
    { digit: "15", indonesian: "lima belas" },
    { digit: "16", indonesian: "enam belas" },
    { digit: "17", indonesian: "tujuh belas" },
    { digit: "18", indonesian: "delapan belas" },
    { digit: "19", indonesian: "sembilan belas" },
    { digit: "20", indonesian: "dua puluh" },
    { digit: "21", indonesian: "dua puluh satu" },
    { digit: "22", indonesian: "dua puluh dua" },
    { digit: "23", indonesian: "dua puluh tiga" },
    { digit: "24", indonesian: "dua puluh empat" },
    { digit: "25", indonesian: "dua puluh lima" },
    { digit: "26", indonesian: "dua puluh enam" },
    { digit: "27", indonesian: "dua puluh tujuh" },
    { digit: "28", indonesian: "dua puluh delapan" },
    { digit: "29", indonesian: "dua puluh sembilan" },
    { digit: "30", indonesian: "tiga puluh" },
    { digit: "31", indonesian: "tiga puluh satu" },
    { digit: "32", indonesian: "tiga puluh dua" },
    { digit: "33", indonesian: "tiga puluh tiga" },
    { digit: "34", indonesian: "tiga puluh empat" },
    { digit: "35", indonesian: "tiga puluh lima" },
    { digit: "36", indonesian: "tiga puluh enam" },
    { digit: "37", indonesian: "tiga puluh tujuh" },
    { digit: "38", indonesian: "tiga puluh delapan" },
    { digit: "39", indonesian: "tiga puluh sembilan" },
    { digit: "40", indonesian: "empat puluh" },
    { digit: "41", indonesian: "empat puluh satu" },
    { digit: "42", indonesian: "empat puluh dua" },
    { digit: "43", indonesian: "empat puluh tiga" },
    { digit: "44", indonesian: "empat puluh empat" },
    { digit: "45", indonesian: "empat puluh lima" },
    { digit: "46", indonesian: "empat puluh enam" },
    { digit: "47", indonesian: "empat puluh tujuh" },
    { digit: "48", indonesian: "empat puluh delapan" },
    { digit: "49", indonesian: "empat puluh sembilan" },
    { digit: "50", indonesian: "lima puluh" },
    { digit: "51", indonesian: "lima puluh satu" },
    { digit: "52", indonesian: "lima puluh dua" },
    { digit: "53", indonesian: "lima puluh tiga" },
    { digit: "54", indonesian: "lima puluh empat" },
    { digit: "55", indonesian: "lima puluh lima" },
    { digit: "56", indonesian: "lima puluh enam" },
    { digit: "57", indonesian: "lima puluh tujuh" },
    { digit: "58", indonesian: "lima puluh delapan" },
    { digit: "59", indonesian: "lima puluh sembilan" },
    { digit: "60", indonesian: "enam puluh" },
    { digit: "61", indonesian: "enam puluh satu" },
    { digit: "62", indonesian: "enam puluh dua" },
    { digit: "63", indonesian: "enam puluh tiga" },
    { digit: "64", indonesian: "enam puluh empat" },
    { digit: "65", indonesian: "enam puluh lima" },
    { digit: "66", indonesian: "enam puluh enam" },
    { digit: "67", indonesian: "enam puluh tujuh" },
    { digit: "68", indonesian: "enam puluh delapan" },
    { digit: "69", indonesian: "enam puluh sembilan" },
    { digit: "70", indonesian: "tujuh puluh" },
    { digit: "71", indonesian: "tujuh puluh satu" },
    { digit: "72", indonesian: "tujuh puluh dua" },
    { digit: "73", indonesian: "tujuh puluh tiga" },
    { digit: "74", indonesian: "tujuh puluh empat" },
    { digit: "75", indonesian: "tujuh puluh lima" },
    { digit: "76", indonesian: "tujuh puluh enam" },
    { digit: "77", indonesian: "tujuh puluh tujuh" },
    { digit: "78", indonesian: "tujuh puluh delapan" },
    { digit: "79", indonesian: "tujuh puluh sembilan" },
    { digit: "80", indonesian: "delapan puluh" },
    { digit: "81", indonesian: "delapan puluh satu" },
    { digit: "82", indonesian: "delapan puluh dua" },
    { digit: "83", indonesian: "delapan puluh tiga" },
    { digit: "84", indonesian: "delapan puluh empat" },
    { digit: "85", indonesian: "delapan puluh lima" },
    { digit: "86", indonesian: "delapan puluh enam" },
    { digit: "87", indonesian: "delapan puluh tujuh" },
    { digit: "88", indonesian: "delapan puluh delapan" },
    { digit: "89", indonesian: "delapan puluh sembilan" },
    { digit: "90", indonesian: "sembilan puluh" },
    { digit: "91", indonesian: "sembilan puluh satu" },
    { digit: "92", indonesian: "sembilan puluh dua" },
    { digit: "93", indonesian: "sembilan puluh tiga" },
    { digit: "94", indonesian: "sembilan puluh empat" },
    { digit: "95", indonesian: "sembilan puluh lima" },
    { digit: "96", indonesian: "sembilan puluh enam" },
    { digit: "97", indonesian: "sembilan puluh tujuh" },
    { digit: "98", indonesian: "sembilan puluh delapan" },
    { digit: "99", indonesian: "sembilan puluh sembilan" },
    { digit: "100", indonesian: "seratus" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Indonesian number: ${numbers[index].indonesian}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-indonesian" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Indonesian
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Angka Indonesia (Indonesian Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Indonesian
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
              <div className="text-2xl font-semibold text-center">{number.indonesian}</div>
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

export default IndonesianNumbers;
