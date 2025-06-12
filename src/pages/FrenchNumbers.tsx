
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const FrenchNumbers = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  // Helper function to convert numbers to French
  const getNumberInFrench = (num: number): { french: string; pronunciation: string } => {
    const ones = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante", "quatre-vingt", "quatre-vingt"];
    
    if (num === 0) return { french: "zéro", pronunciation: "/ze.ʁo/" };
    if (num === 1000) return { french: "mille", pronunciation: "/mil/" };
    
    let result = "";
    let pronunciation = "";
    
    // Hundreds
    if (num >= 100) {
      const hundreds = Math.floor(num / 100);
      if (hundreds === 1) {
        result += "cent";
        pronunciation += "/sɑ̃/";
      } else {
        result += ones[hundreds] + " cent";
        pronunciation += `/${ones[hundreds]} sɑ̃/`;
      }
      if (num % 100 !== 0) {
        result += " ";
        pronunciation += " ";
      }
      num %= 100;
    }
    
    // Tens and ones
    if (num >= 20) {
      const tensDigit = Math.floor(num / 10);
      const onesDigit = num % 10;
      
      if (tensDigit === 7) {
        result += "soixante-" + teens[onesDigit];
        pronunciation += `/swa.sɑ̃.t ${teens[onesDigit]}/`;
      } else if (tensDigit === 9) {
        result += "quatre-vingt-" + teens[onesDigit];
        pronunciation += `/ka.tʁə.vɛ̃ ${teens[onesDigit]}/`;
      } else {
        result += tens[tensDigit];
        pronunciation += `/${tens[tensDigit]}/`;
        if (onesDigit === 1 && tensDigit !== 8) {
          result += "-et-un";
          pronunciation += " e œ̃";
        } else if (onesDigit > 0) {
          result += "-" + ones[onesDigit];
          pronunciation += ` ${ones[onesDigit]}`;
        }
        if (tensDigit === 8 && onesDigit === 0) {
          result += "s";
        }
      }
    } else if (num >= 10) {
      result += teens[num - 10];
      pronunciation += `/${teens[num - 10]}/`;
    } else if (num > 0) {
      result += ones[num];
      pronunciation += `/${ones[num]}/`;
    }
    
    return { french: result, pronunciation };
  };

  // Generate numbers from 0 to 1000
  const numbers = [];
  
  // Add 0-20 individually
  for (let i = 0; i <= 20; i++) {
    const { french, pronunciation } = getNumberInFrench(i);
    numbers.push({
      digit: i.toString(),
      french: french.charAt(0).toUpperCase() + french.slice(1),
      pronunciation,
      example: `${i} ${i <= 1 ? 'livre' : 'livres'} - ${french.charAt(0).toUpperCase() + french.slice(1)} ${i <= 1 ? 'livre' : 'livres'}`
    });
  }
  
  // Add 21-29
  for (let i = 21; i <= 29; i++) {
    const { french, pronunciation } = getNumberInFrench(i);
    numbers.push({
      digit: i.toString(),
      french: french.charAt(0).toUpperCase() + french.slice(1),
      pronunciation,
      example: `${i} jours - ${french.charAt(0).toUpperCase() + french.slice(1)} jours`
    });
  }
  
  // Add 30, 40, 50, 60, 70, 80, 90
  for (let i = 30; i <= 90; i += 10) {
    const { french, pronunciation } = getNumberInFrench(i);
    numbers.push({
      digit: i.toString(),
      french: french.charAt(0).toUpperCase() + french.slice(1),
      pronunciation,
      example: `${i} minutes - ${french.charAt(0).toUpperCase() + french.slice(1)} minutes`
    });
  }
  
  // Add 100, 200, 300, etc.
  for (let i = 100; i <= 900; i += 100) {
    const { french, pronunciation } = getNumberInFrench(i);
    numbers.push({
      digit: i.toString(),
      french: french.charAt(0).toUpperCase() + french.slice(1),
      pronunciation,
      example: `${i} euros - ${french.charAt(0).toUpperCase() + french.slice(1)} euros`
    });
  }
  
  // Add 1000
  const thousand = getNumberInFrench(1000);
  numbers.push({
    digit: "1000",
    french: thousand.french.charAt(0).toUpperCase() + thousand.french.slice(1),
    pronunciation: thousand.pronunciation,
    example: "1000 personnes - Mille personnes"
  });

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-french" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to French
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Numbers in French (0-1000)</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to count and pronounce numbers from zero to one thousand in French
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-8xl mx-auto">
          {numbers.map((number, index) => (
            <div key={index} className="number-card">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl md:text-3xl font-bold text-primary">{number.digit}</div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-xl md:text-2xl mb-2 font-semibold">{number.french}</div>
              <div className="text-muted-foreground mb-3 italic text-sm">{number.pronunciation}</div>
              <div className="text-xs md:text-sm border-t border-border pt-3">
                <strong>Example:</strong> {number.example}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">French Number System</h3>
            <div className="text-left space-y-2 text-sm">
              <p><strong>Note:</strong> French has unique patterns:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>70 = soixante-dix (sixty-ten)</li>
                <li>80 = quatre-vingts (four-twenties)</li>
                <li>90 = quatre-vingt-dix (four-twenty-ten)</li>
                <li>Numbers 21, 31, 41, 51, 61, 71 use "et" (and)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrenchNumbers;
