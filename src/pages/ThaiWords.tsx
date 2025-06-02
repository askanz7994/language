
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ThaiWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "ฉัน", "คุณ", "เขา", "เธอ", "เรา", "พวกคุณ", "พวกเขา", "นี่", "นั่น", "อะไร",
    "ใคร", "ที่ไหน", "เมื่อไหร่", "ทำไม", "อย่างไร", "ใช่", "ไม่", "โปรด", "ขอบคุณ", "ขอโทษ",
    "ชื่อ", "บ้าน", "น้ำ", "อาหาร", "เวลา", "วัน", "คืน", "เช้า", "เย็น", "ปี",
    "เดือน", "สัปดาห์", "วันนี้", "พรุ่งนี้", "เมื่อวาน", "แม่", "พ่อ", "พี่ชาย", "พี่สาว", "เด็ก",
    "ผู้ชาย", "ผู้หญิง", "เพื่อน", "ครู", "หมอ", "หนังสือ", "ปากกา", "กระดาษ", "โต๊ะ", "เก้าอี้",
    "ห้อง", "ประตู", "หน้าต่าง", "เพดาน", "พื้น", "ถนน", "รถยนต์", "รถไฟ", "เครื่องบิน", "ต้นไม้",
    "ดอกไม้", "ใบไม้", "ผลไม้", "ผัก", "ข้าว", "ขนมปัง", "นม", "ชา", "กาแฟ", "น้ำตาล",
    "เกลือ", "น้ำมัน", "เนื้อ", "ปลา", "ไข่", "แดง", "ขาว", "ดำ", "น้ำเงิน", "เขียว",
    "เหลือง", "ชมพู", "น้ำตาล", "เล็ก", "ใหญ่", "ใหม่", "เก่า", "ร้อน", "เย็น", "ดี",
    "เลว", "มีความสุข", "เศร้า", "เร็ว", "ช้า", "ข้างบน", "ข้างล่าง", "ข้างใน", "ข้างนอก", "ที่นี่"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Thai word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-thai" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Thai
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            คำไทย (Thai Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Thai words
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

export default ThaiWords;
