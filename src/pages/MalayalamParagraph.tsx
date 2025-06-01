
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const MalayalamParagraph = () => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const paragraph = {
    malayalam: "എൻ്റെ പേര് ആര്യ. ഞാൻ രാവിലെ ആറ് മണിക്ക് എഴുന്നേൽക്കുന്നു. പിന്നീട് പല്ല് തേക്കുകയും കുളിക്കുകയും ചെയ്യുന്നു. ഞാൻ എന്റെ പ്രഭാതഭക്ഷണം എട്ട് മണിക്ക് കഴിക്കുന്നു. സാധാരണയായി ഞാൻ ദോശയോ ഇഡ്ഡലിയോ ആണ് കഴിക്കാറ്. പിന്നീട് ഞാൻ സ്കൂളിലേക്ക് പോകുന്നു. വൈകുന്നേരം ഞാൻ കളിക്കാനും പഠിക്കാനും സമയം കണ്ടെത്തുന്നു. രാത്രിയിൽ ഞാൻ പുസ്തകങ്ങൾ വായിക്കുകയും കുടുംബത്തോടൊപ്പം സമയം ചിലവഴിക്കുകയും ചെയ്യുന്നു. ഉറങ്ങുന്നതിന് മുമ്പ് ഞാൻ ദൈവത്തോട് പ്രാർത്ഥിക്കുന്നു.",
    transliteration: "Enṟe pēru ārya. Ñān rāvile āṟu maṇikku eḻunnēlkkunnu. Pinīṭu pallu tēkkukayuṁ kuḷikkukayuṁ ceyyunnu. Ñān enṟe prabhātābhakṣaṇaṁ eṭṭu maṇikku kaḻikkunnu. Sādhāraṇayāyi ñān dōśayō iḍḍaliyō āṇu kaḻikkāṟu. Pinīṭu ñān skūḷilēkku pōkunnu. Vaikunēraṁ ñān kaḷikkānuṁ paṭhikkānuṁ samayaṁ kaṇṭettunnu. Rātriyil ñān pustakaṅṅaḷ vāyikkukayuṁ kuṭumbaṭeāppaṁ samayaṁ cilavaḻikkukayuṁ ceyyunnu. Uraṅṅunnatinu munpu ñān daivattōṭu prārthikkunnu.",
    english: "My name is Arya. I wake up at six in the morning. Then I brush my teeth and take a bath. I eat my breakfast at eight o'clock. Usually, I eat dosa or idli. Then I go to school. In the evening, I find time to play and study. At night, I read books and spend time with my family. Before sleeping, I pray to God."
  };

  const playAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => setPlayingAudio(false), 3000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            My Day
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read and understand a Malayalam paragraph about daily routine
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Paragraph Card */}
          <div className="language-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Malayalam Text</h2>
              <Button
                onClick={playAudio}
                className={`audio-button ${playingAudio ? 'animate-pulse' : ''}`}
              >
                🔊 Play Audio
              </Button>
            </div>
            <div className="text-2xl leading-relaxed mb-6 p-6 bg-muted rounded-lg">
              {paragraph.malayalam}
            </div>
          </div>

          {/* Controls */}
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

          {/* Transliteration */}
          {showTransliteration && (
            <div className="language-card mb-8">
              <h3 className="text-xl font-bold mb-4">Transliteration</h3>
              <div className="text-lg leading-relaxed italic p-6 bg-muted rounded-lg">
                {paragraph.transliteration}
              </div>
            </div>
          )}

          {/* Translation */}
          {showTranslation && (
            <div className="language-card mb-8">
              <h3 className="text-xl font-bold mb-4">English Translation</h3>
              <div className="text-lg leading-relaxed p-6 bg-muted rounded-lg">
                {paragraph.english}
              </div>
            </div>
          )}

          {/* Key Vocabulary */}
          <div className="language-card">
            <h3 className="text-2xl font-bold mb-6">Key Vocabulary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">ആര്യ (ārya)</span>
                <span className="text-muted-foreground">Arya (name)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">രാവിലെ (rāvile)</span>
                <span className="text-muted-foreground">morning</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">സ്കൂൾ (skūḷ)</span>
                <span className="text-muted-foreground">school</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">കുടുംബം (kuṭumbam)</span>
                <span className="text-muted-foreground">family</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalayalamParagraph;
