
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const MalayalamWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { english: "Hello", malayalam: "നമസ്കാരം", transliteration: "namaskāram", example: "Hello, how are you? - നമസ്കാരം, സുഖമാണോ?" },
    { english: "Thank you", malayalam: "നന്ദി", transliteration: "nandi", example: "Thank you very much - വളരെ നന്ദി" },
    { english: "Water", malayalam: "വെള്ളം", transliteration: "veḷḷam", example: "I need water - എനിക്ക് വെള്ളം വേണം" },
    { english: "Food", malayalam: "ഭക്ഷണം", transliteration: "bhakṣaṇam", example: "The food is tasty - ഭക്ഷണം രുചികരമാണ്" },
    { english: "House", malayalam: "വീട്", transliteration: "vīṭŭ", example: "My house is big - എന്റെ വീട് വലുതാണ്" },
    { english: "School", malayalam: "സ്കൂൾ", transliteration: "skūḷ", example: "I go to school - ഞാൻ സ്കൂളിൽ പോകുന്നു" },
    { english: "Mother", malayalam: "അമ്മ", transliteration: "amma", example: "My mother is kind - എന്റെ അമ്മ ദയയുള്ളവളാണ്" },
    { english: "Father", malayalam: "അച്ഛൻ", transliteration: "acchan", example: "Father is working - അച്ഛൻ ജോലി ചെയ്യുന്നു" },
    { english: "Friend", malayalam: "സുഹൃത്ത്", transliteration: "suhṛttŭ", example: "He is my friend - അവൻ എന്റെ സുഹൃത്താണ്" },
    { english: "Book", malayalam: "പുസ്തകം", transliteration: "pustakam", example: "I read books - ഞാൻ പുസ്തകങ്ങൾ വായിക്കുന്നു" },
    { english: "Love", malayalam: "സ്നേഹം", transliteration: "snēham", example: "Love is beautiful - സ്നേഹം സുന്ദരമാണ്" },
    { english: "Happy", malayalam: "സന്തോഷം", transliteration: "santōṣam", example: "I am happy - ഞാൻ സന്തോഷവാനാണ്" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
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
            Common Words in Malayalam
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expand your vocabulary with essential Malayalam words
          </p>
        </div>

        {/* Words Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">{word.english}</div>
                  <div className="text-3xl font-semibold">{word.malayalam}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              <div className="text-muted-foreground mb-3 italic">{word.transliteration}</div>
              <div className="text-sm border-t border-border pt-3">
                <strong>Example:</strong><br />
                {word.example}
              </div>
            </div>
          ))}
        </div>

        {/* Practice Section */}
        <div className="text-center mt-16">
          <div className="language-card max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4">Vocabulary Builder</h3>
            <p className="text-muted-foreground mb-4">
              Practice these essential words to build your Malayalam foundation
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
