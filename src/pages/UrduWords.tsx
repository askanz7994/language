
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const UrduWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "آپ", "میں", "ہم", "وہ", "یہ", "کیا", "کون", "کہاں", "کب", "کیوں",
    "کیسے", "جی ہاں", "نہیں", "شکریہ", "معاف کریں", "نام", "گھر", "پانی", "کھانا", "وقت",
    "دن", "رات", "صبح", "شام", "سال", "مہینہ", "ہفتہ", "آج", "کل", "پرسوں",
    "ماں", "باپ", "بھائی", "بہن", "بچہ", "آدمی", "عورت", "دوست", "استاد", "ڈاکٹر",
    "کتاب", "قلم", "کاغذ", "میز", "کرسی", "کمرہ", "دروازہ", "کھڑکی", "چھت", "فرش",
    "سڑک", "گاڑی", "ٹرین", "ہوائی جہاز", "درخت", "پھول", "پتہ", "پھل", "سبزی", "چاول",
    "روٹی", "دودھ", "چائے", "کافی", "چینی", "نمک", "تیل", "گوشت", "مچھلی", "انڈا",
    "سرخ", "سفید", "کالا", "نیلا", "سبز", "پیلا", "گلابی", "بھورا", "چھوٹا", "بڑا",
    "نیا", "پرانا", "گرم", "ٹھنڈا", "اچھا", "برا", "خوش", "غمگین", "تیز", "آہستہ",
    "اوپر", "نیچے", "اندر", "باہر", "آگے", "پیچھے", "دائیں", "بائیں", "یہاں", "وہاں"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Urdu word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-urdu" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Urdu
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            اردو الفاظ (Urdu Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Urdu words
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">{word}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Vocabulary Builder</h3>
            <p className="text-muted-foreground mb-4">
              Click on any word card to hear the pronunciation
            </p>
            <p className="text-sm text-primary">
              Audio pronunciation coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrduWords;
