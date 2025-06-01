
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const MalayalamParagraph = () => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const paragraph = {
    malayalam: "കേരളം ഒരു മനോഹരമായ സംസ്ഥാനമാണ്. ഇവിടെ പച്ചപ്പ് നിറഞ്ഞ മലകളും, വെള്ളി നിറത്തിലുള്ള കടലും, സ്വർണ്ണനിറത്തിലുള്ള കടൽത്തീരങ്ങളും കാണാം. മലയാളികൾ വളരെ സൗഹൃദപരമായ ആളുകളാണ്. അവർ അതിഥികളെ സ്വാഗതം ചെയ്യുന്നത് വളരെ ഊഷ്മളതയോടെയാണ്. കേരളത്തിലെ പ്രധാന ഉത്സവങ്ങൾ ഓണം, വിഷു, ക്രിസ്തുമസ്, ഈദ് എന്നിവയാണ്. ഇവിടുത്തെ പരമ്പരാഗത നൃത്തങ്ങളായ കഥകളിയും മോഹിനിയാട്ടവും ലോകപ്രസിദ്ധമാണ്. കേരളത്തിലെ ആയുർവേദ ചികിത്സകളും വളരെ പ്രശസ്തമാണ്.",
    transliteration: "Kēraḷam oru manōharamāya saṁsthānamāṇ. Iviṭe paccappu niṟañña malakaḷuṁ, veḷḷi niṟattilulla kaṭaluṁ, svarṇṇaniṟattilulla kaṭaltīraṅṅaḷuṁ kāṇāṁ. Malayāḷikaḷ vaḷare sauhr̥daparamāya āḷukaḷāṇ. Avar atithikaḷe svāgataṁ ceyyunnat vaḷare ūṣmaḷatayēṭeyāṇ. Kēraḷattile pradhāna utsavaṅṅaḷ Ēṇaṁ, Viṣu, Kristumas, Īd ennivayāṇ. Iviṭutte paramparāgata nr̥ttaṅṅaḷāya katakaḷiyuṁ mōhiniyāṭṭavuṁ lōkaprasiddhamāṇ. Kēraḷattile āyurvēda cikitsakaḷuṁ vaḷare praśastamāṇ.",
    english: "Kerala is a beautiful state. Here you can see green-filled mountains, silver-colored seas, and golden beaches. Malayalis are very friendly people. They welcome guests with great warmth. The main festivals of Kerala are Onam, Vishu, Christmas, and Eid. The traditional dances here like Kathakali and Mohiniyattam are world-famous. Ayurvedic treatments in Kerala are also very famous."
  };

  const playAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => setPlayingAudio(false), 3000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Beautiful Kerala
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read and understand a Malayalam paragraph about Kerala's beauty and culture
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
                <span className="font-semibold">കേരളം (kēraḷam)</span>
                <span className="text-muted-foreground">Kerala</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">മനോഹരം (manōharam)</span>
                <span className="text-muted-foreground">beautiful</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">മലകൾ (malakaḷ)</span>
                <span className="text-muted-foreground">mountains</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">ആയുർവേദം (āyurvēdam)</span>
                <span className="text-muted-foreground">Ayurveda</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalayalamParagraph;
