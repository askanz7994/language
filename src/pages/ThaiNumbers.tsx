
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const ThaiNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const numbers = [
    { digit: "0", thai: "ศูนย์" },
    { digit: "1", thai: "หนึ่ง" },
    { digit: "2", thai: "สอง" },
    { digit: "3", thai: "สาม" },
    { digit: "4", thai: "สี่" },
    { digit: "5", thai: "ห้า" },
    { digit: "6", thai: "หก" },
    { digit: "7", thai: "เจ็ด" },
    { digit: "8", thai: "แปด" },
    { digit: "9", thai: "เก้า" },
    { digit: "10", thai: "สิบ" },
    { digit: "11", thai: "สิบเอ็ด" },
    { digit: "12", thai: "สิบสอง" },
    { digit: "13", thai: "สิบสาม" },
    { digit: "14", thai: "สิบสี่" },
    { digit: "15", thai: "สิบห้า" },
    { digit: "16", thai: "สิบหก" },
    { digit: "17", thai: "สิบเจ็ด" },
    { digit: "18", thai: "สิบแปด" },
    { digit: "19", thai: "สิบเก้า" },
    { digit: "20", thai: "ยี่สิบ" },
    { digit: "21", thai: "ยี่สิบเอ็ด" },
    { digit: "22", thai: "ยี่สิบสอง" },
    { digit: "23", thai: "ยี่สิบสาม" },
    { digit: "24", thai: "ยี่สิบสี่" },
    { digit: "25", thai: "ยี่สิบห้า" },
    { digit: "26", thai: "ยี่สิบหก" },
    { digit: "27", thai: "ยี่สิบเจ็ด" },
    { digit: "28", thai: "ยี่สิบแปด" },
    { digit: "29", thai: "ยี่สิบเก้า" },
    { digit: "30", thai: "สามสิบ" },
    { digit: "31", thai: "สามสิบเอ็ด" },
    { digit: "32", thai: "สามสิบสอง" },
    { digit: "33", thai: "สามสิบสาม" },
    { digit: "34", thai: "สามสิบสี่" },
    { digit: "35", thai: "สามสิบห้า" },
    { digit: "36", thai: "สามสิบหก" },
    { digit: "37", thai: "สามสิบเจ็ด" },
    { digit: "38", thai: "สามสิบแปด" },
    { digit: "39", thai: "สามสิบเก้า" },
    { digit: "40", thai: "สี่สิบ" },
    { digit: "41", thai: "สี่สิบเอ็ด" },
    { digit: "42", thai: "สี่สิบสอง" },
    { digit: "43", thai: "สี่สิบสาม" },
    { digit: "44", thai: "สี่สิบสี่" },
    { digit: "45", thai: "สี่สิบห้า" },
    { digit: "46", thai: "สี่สิบหก" },
    { digit: "47", thai: "สี่สิบเจ็ด" },
    { digit: "48", thai: "สี่สิบแปด" },
    { digit: "49", thai: "สี่สิบเก้า" },
    { digit: "50", thai: "ห้าสิบ" },
    { digit: "51", thai: "ห้าสิบเอ็ด" },
    { digit: "52", thai: "ห้าสิบสอง" },
    { digit: "53", thai: "ห้าสิบสาม" },
    { digit: "54", thai: "ห้าสิบสี่" },
    { digit: "55", thai: "ห้าสิบห้า" },
    { digit: "56", thai: "ห้าสิบหก" },
    { digit: "57", thai: "ห้าสิบเจ็ด" },
    { digit: "58", thai: "ห้าสิบแปด" },
    { digit: "59", thai: "ห้าสิบเก้า" },
    { digit: "60", thai: "หกสิบ" },
    { digit: "61", thai: "หกสิบเอ็ด" },
    { digit: "62", thai: "หกสิบสอง" },
    { digit: "63", thai: "หกสิบสาม" },
    { digit: "64", thai: "หกสิบสี่" },
    { digit: "65", thai: "หกสิบห้า" },
    { digit: "66", thai: "หกสิบหก" },
    { digit: "67", thai: "หกสิบเจ็ด" },
    { digit: "68", thai: "หกสิบแปด" },
    { digit: "69", thai: "หกสิบเก้า" },
    { digit: "70", thai: "เจ็ดสิบ" },
    { digit: "71", thai: "เจ็ดสิบเอ็ด" },
    { digit: "72", thai: "เจ็ดสิบสอง" },
    { digit: "73", thai: "เจ็ดสิบสาม" },
    { digit: "74", thai: "เจ็ดสิบสี่" },
    { digit: "75", thai: "เจ็ดสิบห้า" },
    { digit: "76", thai: "เจ็ดสิบหก" },
    { digit: "77", thai: "เจ็ดสิบเจ็ด" },
    { digit: "78", thai: "เจ็ดสิบแปด" },
    { digit: "79", thai: "เจ็ดสิบเก้า" },
    { digit: "80", thai: "แปดสิบ" },
    { digit: "81", thai: "แปดสิบเอ็ด" },
    { digit: "82", thai: "แปดสิบสอง" },
    { digit: "83", thai: "แปดสิบสาม" },
    { digit: "84", thai: "แปดสิบสี่" },
    { digit: "85", thai: "แปดสิบห้า" },
    { digit: "86", thai: "แปดสิบหก" },
    { digit: "87", thai: "แปดสิบเจ็ด" },
    { digit: "88", thai: "แปดสิบแปด" },
    { digit: "89", thai: "แปดสิบเก้า" },
    { digit: "90", thai: "เก้าสิบ" },
    { digit: "91", thai: "เก้าสิบเอ็ด" },
    { digit: "92", thai: "เก้าสิบสอง" },
    { digit: "93", thai: "เก้าสิบสาม" },
    { digit: "94", thai: "เก้าสิบสี่" },
    { digit: "95", thai: "เก้าสิบห้า" },
    { digit: "96", thai: "เก้าสิบหก" },
    { digit: "97", thai: "เก้าสิบเจ็ด" },
    { digit: "98", thai: "เก้าสิบแปด" },
    { digit: "99", thai: "เก้าสิบเก้า" },
    { digit: "100", thai: "หนึ่งร้อย" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Thai number: ${numbers[index].thai}`);
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
            ตัวเลขไทย (Thai Numbers)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn to count from 0 to 100 in Thai
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
              <div className="text-2xl font-semibold text-center">{number.thai}</div>
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

export default ThaiNumbers;
