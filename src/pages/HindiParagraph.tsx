
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const HindiParagraph = () => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const paragraph = {
    hindi: "मेरा नाम अर्जुन है। मैं सुबह छह बजे उठता हूं। उसके बाद मैं दांत साफ करता हूं और नहाता हूं। मैं आठ बजे अपना नाश्ता करता हूं। आमतौर पर मैं पराठा या दलिया खाता हूं। फिर मैं स्कूल जाता हूं। शाम को मैं खेलने और पढ़ने का समय निकालता हूं। रात में मैं किताबें पढ़ता हूं और परिवार के साथ समय बिताता हूं। सोने से पहले मैं भगवान से प्रार्थना करता हूं।",
    transliteration: "Mera naam Arjun hai. Main subah chhah baje uthta hun. Uske baad main daant saaf karta hun aur nahaata hun. Main aath baje apna naashta karta hun. Aamtaur par main paraatha ya daliya khaata hun. Phir main school jaata hun. Shaam ko main khelne aur padhne ka samay nikalta hun. Raat mein main kitaaben padhta hun aur parivaar ke saath samay bitaata hun. Sone se pehle main bhagwaan se praarthana karta hun.",
    english: "My name is Arjun. I wake up at six in the morning. After that, I brush my teeth and take a bath. I eat my breakfast at eight o'clock. Usually, I eat paratha or porridge. Then I go to school. In the evening, I find time to play and study. At night, I read books and spend time with my family. Before sleeping, I pray to God."
  };

  const playAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => setPlayingAudio(false), 3000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-hindi" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hindi
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Day</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read and understand a Hindi paragraph about daily routine
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Hindi Text</h2>
              <Button
                onClick={playAudio}
                className={`audio-button ${playingAudio ? 'animate-pulse' : ''}`}
              >
                🔊 Play Audio
              </Button>
            </div>
            <div className="text-2xl leading-relaxed mb-6 p-6 bg-muted rounded-lg">
              {paragraph.hindi}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              onClick={() => setShowTransliteration(!showTransliteration)}
              variant={showTransliteration ? "default" : "outline"}
              className="glow-button"
            >
              {showTransliteration ? "Hide" : "Show"} Transliteration
            </Button>
            <Button
              onClick={() => setShowTranslation(!showTranslation)}
              variant={showTranslation ? "default" : "outline"}
              className="glow-button"
            >
              {showTranslation ? "Hide" : "Show"} English Translation
            </Button>
          </div>

          {showTransliteration && (
            <div className="language-card mb-8">
              <h3 className="text-xl font-bold mb-4">Transliteration</h3>
              <div className="text-lg leading-relaxed italic p-6 bg-muted rounded-lg">
                {paragraph.transliteration}
              </div>
            </div>
          )}

          {showTranslation && (
            <div className="language-card mb-8">
              <h3 className="text-xl font-bold mb-4">English Translation</h3>
              <div className="text-lg leading-relaxed p-6 bg-muted rounded-lg">
                {paragraph.english}
              </div>
            </div>
          )}

          <div className="language-card">
            <h3 className="text-2xl font-bold mb-6">Key Vocabulary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">अर्जुन (Arjun)</span>
                <span className="text-muted-foreground">Arjun (name)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">सुबह (subah)</span>
                <span className="text-muted-foreground">morning</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">स्कूल (school)</span>
                <span className="text-muted-foreground">school</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">परिवार (parivaar)</span>
                <span className="text-muted-foreground">family</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HindiParagraph;
