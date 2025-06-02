
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const FrenchParagraph = () => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const paragraph = {
    french: "Je m'appelle Marie. Je me réveille à six heures du matin. Après m'être réveillée, je me brosse les dents et je prends une douche. Je prends mon petit-déjeuner à huit heures. D'habitude, je mange des céréales ou du pain grillé avec de la confiture. Puis je vais à l'école en bus. À l'école, j'assiste aux cours et je rencontre mes amis. Le soir, je fais mes devoirs et je joue. La nuit, je lis des livres et je passe du temps avec ma famille. Nous regardons souvent des films ensemble ou nous parlons de notre journée. Avant d'aller me coucher, je prépare mes vêtements pour le lendemain et je règle mon réveil.",
    pronunciation: "Zhuh ma-PEHL ma-REE. Zhuh muh ray-VEHY ah see zuhr doo ma-TAN. Ah-pray may-truh ray-vay-YAY, zhuh muh BROSH lay dahn ay zhuh prahn oon DOOSH. Zhuh prahn mon puh-TEE day-zhuh-NAY ah weet zuhr. Dah-bee-TEWD, zhuh mahnzh day say-ray-AHL oo doo pahn gree-YAY ah-vek duh lah kon-fee-TEWR. Pwee zhuh vay ah lay-KOHL ahn boos. Ah lay-KOHL, zhah-SEEST oh koor ay zhuh rahn-kon-truh may zah-MEE. Luh swahr, zhuh fay may duh-VWAHR ay zhuh ZHOO. Lah nwee, zhuh lee day LEE-vruh ay zhuh pahs doo tahn ah-vek mah fah-MEE. Noo ruh-gar-dohn soo-vahn day feelm ahn-SAHM-bluh oo noo par-lohn duh no-truh zhoor-NAY. Ah-vahn dah-lay muh koo-SHAY, zhuh pray-pahr may vet-mahn poor luh lahn-duh-MAN ay zhuh RAY-gluh mon ray-VEHY.",
    english: "My name is Marie. I wake up at six in the morning. After waking up, I brush my teeth and take a shower. I have breakfast at eight o'clock. Usually, I eat cereal or toast with jam. Then I go to school by bus. At school, I attend classes and meet my friends. In the evening, I do my homework and play. At night, I read books and spend time with my family. We often watch movies together or talk about our day. Before going to bed, I prepare my clothes for the next day and set my alarm."
  };

  const playAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => setPlayingAudio(false), 3000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-french" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to French
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Day</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read and understand a French paragraph about daily routine
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">French Text</h2>
              <Button
                onClick={playAudio}
                className={`audio-button ${playingAudio ? 'animate-pulse' : ''}`}
              >
                🔊 Play Audio
              </Button>
            </div>
            <div className="text-2xl leading-relaxed mb-6 p-6 bg-muted rounded-lg">
              {paragraph.french}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              onClick={() => setShowTransliteration(!showTransliteration)}
              variant={showTransliteration ? "default" : "outline"}
              className="glow-button"
            >
              {showTransliteration ? "Hide" : "Show"} Pronunciation
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
              <h3 className="text-xl font-bold mb-4">Pronunciation Guide</h3>
              <div className="text-lg leading-relaxed italic p-6 bg-muted rounded-lg">
                {paragraph.pronunciation}
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
                <span className="font-semibold">matin</span>
                <span className="text-muted-foreground">morning</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">école</span>
                <span className="text-muted-foreground">school</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">famille</span>
                <span className="text-muted-foreground">family</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">devoirs</span>
                <span className="text-muted-foreground">homework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrenchParagraph;
