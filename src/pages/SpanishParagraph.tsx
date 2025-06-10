
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const SpanishParagraph = () => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);

  const paragraph = {
    spanish: "Me llamo Carlos. Me despierto a las seis de la mañana. Después de despertarme, me lavo los dientes y me ducho. Desayuno a las ocho en punto. Normalmente como cereales o tostadas con mermelada. Luego voy a la escuela en autobús. En la escuela, asisto a clases y me encuentro con mis amigos. Por la tarde, hago mis deberes y juego. Por la noche, leo libros y paso tiempo con mi familia. A menudo vemos películas juntos o hablamos sobre nuestro día. Antes de ir a dormir, preparo mi ropa para el día siguiente y pongo el despertador.",
    pronunciation: "Me YA-mo KAR-los. Me des-PYER-to a las seys de la ma-NYA-na. Des-PWES de des-per-TAR-me, me LA-vo los DYEN-tes y me DU-cho. De-sa-YU-no a las O-cho en PUN-to. Nor-mal-MEN-te KO-mo se-re-A-les o tos-TA-das kon mer-me-LA-da. LWE-go voy a la es-KWE-la en au-to-BUS. En la es-KWE-la, a-SIS-to a KLA-ses y me en-KWEN-tro kon mis a-MI-gos. Por la TAR-de, A-go mis de-BE-res y JWE-go. Por la NO-che, LE-o LI-bros y PA-so TYEM-po kon mi fa-MI-lya. A me-NU-do VE-mos pe-LI-ku-las JUN-tos o a-BLA-mos SO-bre NWES-tro DI-a. AN-tes de ir a dor-MIR, pre-PA-ro mi RO-pa PA-ra el DI-a si-GYEN-te y PON-go el des-per-ta-DOR.",
    english: "My name is Carlos. I wake up at six in the morning. After waking up, I brush my teeth and take a shower. I have breakfast at eight o'clock. Usually, I eat cereal or toast with jam. Then I go to school by bus. At school, I attend classes and meet my friends. In the afternoon, I do my homework and play. At night, I read books and spend time with my family. We often watch movies together or talk about our day. Before going to sleep, I prepare my clothes for the next day and set my alarm clock."
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-spanish" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Spanish
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Day</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read and understand a Spanish paragraph about daily routine
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Spanish Text</h2>
            </div>
            <div className="text-2xl leading-relaxed mb-6 p-6 bg-muted rounded-lg">
              {paragraph.spanish}
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
                <span className="font-semibold">mañana</span>
                <span className="text-muted-foreground">morning</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">escuela</span>
                <span className="text-muted-foreground">school</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">familia</span>
                <span className="text-muted-foreground">family</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">deberes</span>
                <span className="text-muted-foreground">homework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpanishParagraph;
