
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const IndonesianWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "saya", "anda", "dia", "dia", "kami", "kalian", "mereka", "ini", "itu", "apa",
    "siapa", "dimana", "kapan", "mengapa", "bagaimana", "ya", "tidak", "tolong", "terima kasih", "maaf",
    "nama", "rumah", "air", "makanan", "waktu", "hari", "malam", "pagi", "sore", "tahun",
    "bulan", "minggu", "hari ini", "besok", "kemarin", "ibu", "ayah", "saudara", "saudari", "anak",
    "pria", "wanita", "teman", "guru", "dokter", "buku", "pena", "kertas", "meja", "kursi",
    "kamar", "pintu", "jendela", "atap", "lantai", "jalan", "mobil", "kereta", "pesawat", "pohon",
    "bunga", "daun", "buah", "sayuran", "nasi", "roti", "susu", "teh", "kopi", "gula",
    "garam", "minyak", "daging", "ikan", "telur", "merah", "putih", "hitam", "biru", "hijau",
    "kuning", "merah muda", "coklat", "kecil", "besar", "baru", "lama", "panas", "dingin", "baik",
    "buruk", "senang", "sedih", "cepat", "lambat", "atas", "bawah", "dalam", "luar", "disini"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Indonesian word: ${words[index]}`);
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
            Kata-kata Indonesia (Indonesian Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Indonesian words
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

export default IndonesianWords;
