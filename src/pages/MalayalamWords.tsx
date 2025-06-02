
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const MalayalamWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    "അമ്മ", "അച്ഛൻ", "കൂട്ടുകാരൻ", "വീട്", "സ്കൂൾ", "പുസ്തകം", "വെള്ളം", "ഭക്ഷണം", "പൂവ്", "മരം",
    "സൂര്യൻ", "ചന്ദ്രൻ", "നക്ഷത്രം", "ആകാശം", "ഭൂമി", "കടൽ", "നദി", "മല", "പാത", "വാതിൽ",
    "ജനൽ", "കസേര", "മേശ", "കിടക്ക", "വസ്ത്രം", "ചെരുപ്പ്", "തൊപ്പി", "കൈ", "കാൽ", "കണ്ണ്",
    "ചെവി", "മൂക്ക്", "വായ", "തല", "മുടി", "ഹൃദയം", "ചിന്ത", "സ്നേഹം", "സന്തോഷം", "ദുഃഖം",
    "കോപം", "ഭയം", "ചിരി", "കരച്ചിൽ", "നിഴൽ", "വെളിച്ചം", "രാത്രി", "പകൽ", "സമയം", "വർഷം",
    "മാസം", "ദിവസം", "ആഴ്ച", "പുലർച്ചെ", "വൈകുന്നേരം", "ഇപ്പോൾ", "നാളെ", "ഇന്നലെ", "തുടക്കം", "അവസാനം",
    "ചെറുത്", "വലുത്", "പുതിയത്", "പഴയത്", "നല്ലത്", "മോശം", "അതെ", "ഇല്ല", "നന്ദി", "ക്ഷമിക്കണം",
    "വരൂ", "പോകൂ", "നിൽക്കൂ", "പറയുക", "കേൾക്കുക", "കാണുക", "കഴിക്കുക", "കുടിക്കുക", "ഉറങ്ങുക", "എഴുന്നേൽക്കുക",
    "ചിന്തിക്കുക", "പഠിക്കുക", "എഴുതുക", "വായിക്കുക", "കളിക്കുക", "ജോലി", "പണം", "വഴി", "നാട്", "ഭാഷ",
    "പേര്", "ദേശം", "മനുഷ്യൻ", "സ്ത്രീ", "പുരുഷൻ", "കുട്ടി", "ജീവിതം", "മരണം", "സത്യം", "മിഥ്യ"
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for Malayalam word: ${words[index]}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            മലയാളം വാക്കുകൾ (Malayalam Words)
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Listen and learn Malayalam words
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

export default MalayalamWords;
