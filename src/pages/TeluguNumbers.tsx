
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const TeluguNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", telugu: "సున్నా" },
    { digit: "1", telugu: "ఒకటి" },
    { digit: "2", telugu: "రెండు" },
    { digit: "3", telugu: "మూడు" },
    { digit: "4", telugu: "నాలుగు" },
    { digit: "5", telugu: "అయిదు" },
    { digit: "6", telugu: "ఆరు" },
    { digit: "7", telugu: "ఏడు" },
    { digit: "8", telugu: "ఎనిమిది" },
    { digit: "9", telugu: "తొమ్మిది" },
    { digit: "10", telugu: "పది" },
    { digit: "11", telugu: "పదకొండు" },
    { digit: "12", telugu: "పన్నెండు" },
    { digit: "13", telugu: "పదమూడు" },
    { digit: "14", telugu: "పద్నాలుగు" },
    { digit: "15", telugu: "పదిహేను" },
    { digit: "16", telugu: "పదహారు" },
    { digit: "17", telugu: "పదిహేడు" },
    { digit: "18", telugu: "పదెనిమిది" },
    { digit: "19", telugu: "పందొమ్మిది" },
    { digit: "20", telugu: "ఇరవై" },
    { digit: "21", telugu: "ఇరవై ఒకటి" },
    { digit: "22", telugu: "ఇరవై రెండు" },
    { digit: "23", telugu: "ఇరవై మూడు" },
    { digit: "24", telugu: "ఇరవై నాలుగు" },
    { digit: "25", telugu: "ఇరవై అయిదు" },
    { digit: "26", telugu: "ఇరవై ఆరు" },
    { digit: "27", telugu: "ఇరవై ఏడు" },
    { digit: "28", telugu: "ఇరవై ఎనిమిది" },
    { digit: "29", telugu: "ఇరవై తొమ్మిది" },
    { digit: "30", telugu: "ముప్పై" },
    { digit: "31", telugu: "ముప్పై ఒకటి" },
    { digit: "32", telugu: "ముప్పై రెండు" },
    { digit: "33", telugu: "ముప్పై మూడు" },
    { digit: "34", telugu: "ముప్పై నాలుగు" },
    { digit: "35", telugu: "ముప్పై అయిదు" },
    { digit: "36", telugu: "ముప్పై ఆరు" },
    { digit: "37", telugu: "ముప్పై ఏడు" },
    { digit: "38", telugu: "ముప్పై ఎనిమిది" },
    { digit: "39", telugu: "ముప్పై తొమ్మిది" },
    { digit: "40", telugu: "నలభై" },
    { digit: "41", telugu: "నలభై ఒకటి" },
    { digit: "42", telugu: "నలభై రెండు" },
    { digit: "43", telugu: "నలభై మూడు" },
    { digit: "44", telugu: "నలభై నాలుగు" },
    { digit: "45", telugu: "నలభై అయిదు" },
    { digit: "46", telugu: "నలభై ఆరు" },
    { digit: "47", telugu: "నలభై ఏడు" },
    { digit: "48", telugu: "నలభై ఎనిమిది" },
    { digit: "49", telugu: "నలభై తొమ్మిది" },
    { digit: "50", telugu: "యాభై" },
    { digit: "51", telugu: "యాభై ఒకటి" },
    { digit: "52", telugu: "యాభై రెండు" },
    { digit: "53", telugu: "యాభై మూడు" },
    { digit: "54", telugu: "యాభై నాలుగు" },
    { digit: "55", telugu: "యాభై అయిదు" },
    { digit: "56", telugu: "యాభై ఆరు" },
    { digit: "57", telugu: "యాభై ఏడు" },
    { digit: "58", telugu: "యాభై ఎనిమిది" },
    { digit: "59", telugu: "యాభై తొమ్మిది" },
    { digit: "60", telugu: "అరవై" },
    { digit: "61", telugu: "అరవై ఒకటి" },
    { digit: "62", telugu: "అరవై రెండు" },
    { digit: "63", telugu: "అరవై మూడు" },
    { digit: "64", telugu: "అరవై నాలుగు" },
    { digit: "65", telugu: "అరవై అయిదు" },
    { digit: "66", telugu: "అరవై ఆరు" },
    { digit: "67", telugu: "అరవై ఏడు" },
    { digit: "68", telugu: "అరవై ఎనిమిది" },
    { digit: "69", telugu: "అరవై తొమ్మిది" },
    { digit: "70", telugu: "డెబ్బై" },
    { digit: "71", telugu: "డెబ్బై ఒకటి" },
    { digit: "72", telugu: "డెబ్బై రెండు" },
    { digit: "73", telugu: "డెబ్బై మూడు" },
    { digit: "74", telugu: "డెబ్బై నాలుగు" },
    { digit: "75", telugu: "డెబ్బై అయిదు" },
    { digit: "76", telugu: "డెబ్బై ఆరు" },
    { digit: "77", telugu: "డెబ్బై ఏడు" },
    { digit: "78", telugu: "డెబ్బై ఎనిమిది" },
    { digit: "79", telugu: "డెబ్బై తొమ్మిది" },
    { digit: "80", telugu: "ఎనభై" },
    { digit: "81", telugu: "ఎనభై ఒకటి" },
    { digit: "82", telugu: "ఎనభై రెండు" },
    { digit: "83", telugu: "ఎనభై మూడు" },
    { digit: "84", telugu: "ఎనభై నాలుగు" },
    { digit: "85", telugu: "ఎనభై అయిదు" },
    { digit: "86", telugu: "ఎనభై ఆరు" },
    { digit: "87", telugu: "ఎనభై ఏడు" },
    { digit: "88", telugu: "ఎనభై ఎనిమిది" },
    { digit: "89", telugu: "ఎనభై తొమ్మిది" },
    { digit: "90", telugu: "తొంభై" },
    { digit: "91", telugu: "తొంభై ఒకటి" },
    { digit: "92", telugu: "తొంభై రెండు" },
    { digit: "93", telugu: "తొంభై మూడు" },
    { digit: "94", telugu: "తొంభై నాలుగు" },
    { digit: "95", telugu: "తొంభై అయిదు" },
    { digit: "96", telugu: "తొంభై ఆరు" },
    { digit: "97", telugu: "తొంభై ఏడు" },
    { digit: "98", telugu: "తొంభై ఎనిమిది" },
    { digit: "99", telugu: "తొంభై తొమ్మిది" },
    { digit: "100", telugu: "వంద" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Telugu number: ${numbers[index].telugu}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-telugu" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Telugu
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            తెలుగు సంఖ్యలు (Telugu Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Telugu
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
              <div className="text-2xl font-semibold text-center">{number.telugu}</div>
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

export default TeluguNumbers;
