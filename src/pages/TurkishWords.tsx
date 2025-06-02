
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const TurkishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "ben", "sen", "o", "o", "biz", "siz", "onlar", "bu", "şu", "ne",
    "kim", "nerede", "ne zaman", "neden", "nasıl", "evet", "hayır", "lütfen", "teşekkürler", "üzgünüm",
    "isim", "ev", "su", "yemek", "zaman", "gün", "gece", "sabah", "akşam", "yıl",
    "ay", "hafta", "bugün", "yarın", "dün", "anne", "baba", "kardeş", "kız kardeş", "çocuk",
    "adam", "kadın", "arkadaş", "öğretmen", "doktor", "kitap", "kalem", "kağıt", "masa", "sandalye",
    "oda", "kapı", "pencere", "tavan", "zemin", "yol", "araba", "tren", "uçak", "ağaç",
    "çiçek", "yaprak", "meyve", "sebze", "pirinç", "ekmek", "süt", "çay", "kahve", "şeker",
    "tuz", "yağ", "et", "balık", "yumurta", "kırmızı", "beyaz", "siyah", "mavi", "yeşil",
    "sarı", "pembe", "kahverengi", "küçük", "büyük", "yeni", "eski", "sıcak", "soğuk", "iyi",
    "kötü", "mutlu", "üzgün", "hızlı", "yavaş", "üst", "alt", "içinde", "dışında", "burada"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Turkish word: ${words[index]}`);
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
            Türkçe Kelimeler (Turkish Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Turkish words
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
      </div>
    </div>
  );
};

export default TurkishWords;
