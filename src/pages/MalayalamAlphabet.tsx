
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const MalayalamAlphabet = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const vowels = [
    { letter: "അ", name: "A", pronunciation: "/ɐ/", example: "അമ്മ (Amma) - Mother" },
    { letter: "ആ", name: "Aa", pronunciation: "/aː/", example: "ആകാശം (Aakaasham) - Sky" },
    { letter: "ഇ", name: "I", pronunciation: "/i/", example: "ഇല (Ila) - Leaf" },
    { letter: "ഈ", name: "Ee", pronunciation: "/iː/", example: "ഈച്ച (Eechu) - Fly" },
    { letter: "ഉ", name: "U", pronunciation: "/u/", example: "ഉമ്മ (Umma) - Kiss" },
    { letter: "ഊ", name: "Oo", pronunciation: "/uː/", example: "ഊഷ്മാവ് (Ooshmaav) - Warmth" },
    { letter: "ഋ", name: "Ru", pronunciation: "/r̥/", example: "ഋതു (Ruthu) - Season" },
    { letter: "എ", name: "E", pronunciation: "/e/", example: "എലി (Eli) - Rat" },
    { letter: "ഏ", name: "Ae", pronunciation: "/eː/", example: "ഏക (Aeka) - One" },
    { letter: "ഐ", name: "Ai", pronunciation: "/ɐi/", example: "ഐക്യം (Aikyam) - Unity" },
    { letter: "ഒ", name: "O", pronunciation: "/o/", example: "ഒരു (Oru) - One" },
    { letter: "ഓ", name: "Oo", pronunciation: "/oː/", example: "ഓടം (Odam) - Boat" },
    { letter: "ഔ", name: "Au", pronunciation: "/ɐu/", example: "ഔഷധം (Aushadham) - Medicine" },
  ];

  const consonants = [
    { letter: "ക", name: "Ka", pronunciation: "/kɐ/", example: "കട (Kada) - Shop" },
    { letter: "ഖ", name: "Kha", pronunciation: "/kʰɐ/", example: "ഖനി (Khani) - Mine" },
    { letter: "ഗ", name: "Ga", pronunciation: "/ɡɐ/", example: "ഗദ്ദ (Gadda) - Mace" },
    { letter: "ഘ", name: "Gha", pronunciation: "/ɡʰɐ/", example: "ഘടികാരം (Ghadikaram) - Clock" },
    { letter: "ങ", name: "Nga", pronunciation: "/ŋɐ/", example: "മങ്ങൽ (Mangal) - Dimness" },
    { letter: "ച", name: "Cha", pronunciation: "/t͡ʃɐ/", example: "ചട്ടി (Chatti) - Pot" },
    { letter: "ഛ", name: "Chha", pronunciation: "/t͡ʃʰɐ/", example: "ഛായ (Chhaaya) - Shadow" },
    { letter: "ജ", name: "Ja", pronunciation: "/d͡ʒɐ/", example: "ജലം (Jalam) - Water" },
    { letter: "ഝ", name: "Jha", pronunciation: "/d͡ʒʰɐ/", example: "ഝണ്ട (Jhanda) - Flag" },
    { letter: "ഞ", name: "Nja", pronunciation: "/ɲɐ/", example: "ഞാൻ (Njan) - I" },
    { letter: "ട", name: "Ta", pronunciation: "/ʈɐ/", example: "ടാക്സി (Taxi) - Taxi" },
    { letter: "ഠ", name: "Tha", pronunciation: "/ʈʰɐ/", example: "ഠക്കുറി (Thakkuri) - Cheat" },
    { letter: "ഡ", name: "Da", pronunciation: "/ɖɐ/", example: "ഡോക്ടർ (Doctor) - Doctor" },
    { letter: "ഢ", name: "Dha", pronunciation: "/ɖʰɐ/", example: "ഢാക്ക (Dhakka) - Dhaka" },
    { letter: "ണ", name: "Na", pronunciation: "/ɳɐ/", example: "കണ്ണ് (Kann) - Eye" },
    { letter: "ത", name: "Tha", pronunciation: "/t̪ɐ/", example: "തല (Thala) - Head" },
    { letter: "ഥ", name: "Thha", pronunciation: "/t̪ʰɐ/", example: "ഥട്ടം (Thattam) - Platform" },
    { letter: "ദ", name: "Da", pronunciation: "/d̪ɐ/", example: "ദിവസം (Divasam) - Day" },
    { letter: "ധ", name: "Dha", pronunciation: "/d̪ʰɐ/", example: "ധനം (Dhanam) - Wealth" },
    { letter: "ന", name: "Na", pronunciation: "/n̪ɐ/", example: "നല്ല (Nalla) - Good" },
    { letter: "പ", name: "Pa", pronunciation: "/pɐ/", example: "പാൽ (Paal) - Milk" },
    { letter: "ഫ", name: "Pha", pronunciation: "/pʰɐ/", example: "ഫലം (Phalam) - Fruit" },
    { letter: "ബ", name: "Ba", pronunciation: "/bɐ/", example: "ബുക്ക് (Book) - Book" },
    { letter: "ഭ", name: "Bha", pronunciation: "/bʰɐ/", example: "ഭാഷ (Bhaasha) - Language" },
    { letter: "മ", name: "Ma", pronunciation: "/mɐ/", example: "മരം (Maram) - Tree" },
    { letter: "യ", name: "Ya", pronunciation: "/jɐ/", example: "യുദ്ധം (Yuddham) - War" },
    { letter: "ര", name: "Ra", pronunciation: "/ɾɐ/", example: "രാജാ (Raaja) - King" },
    { letter: "ല", name: "La", pronunciation: "/lɐ/", example: "ലോകം (Lokam) - World" },
    { letter: "വ", name: "Va", pronunciation: "/ʋɐ/", example: "വാതിൽ (Vaathil) - Door" },
    { letter: "ശ", name: "Sha", pronunciation: "/ʃɐ/", example: "ശാന്തി (Shaanthi) - Peace" },
    { letter: "ഷ", name: "Sha", pronunciation: "/ʂɐ/", example: "ഷിഫ്റ്റ് (Shift) - Shift" },
    { letter: "സ", name: "Sa", pronunciation: "/sɐ/", example: "സമയം (Samayam) - Time" },
    { letter: "ഹ", name: "Ha", pronunciation: "/ɦɐ/", example: "ഹൃദയം (Hrudayam) - Heart" },
    { letter: "ള", name: "La", pronunciation: "/ɭɐ/", example: "കാള (Kaala) - Bull" },
    { letter: "ഴ", name: "Zha", pronunciation: "/ɻɐ/", example: "ഴുഴു (Zhuzhu) - Ant" },
    { letter: "റ", name: "Ra", pronunciation: "/rɐ/", example: "കറുപ്പ് (Karupp) - Black" },
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Malayalam Alphabet</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn the beautiful Malayalam script with vowels and consonants
          </p>
        </div>

        {/* Vowels Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Vowels (സ്വരങ്ങൾ)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vowels.map((vowel, index) => (
              <div key={index} className="number-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-primary">{vowel.letter}</div>
                  <Button
                    onClick={() => playAudio(index)}
                    className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                    size="sm"
                  >
                    🔊
                  </Button>
                </div>
                <div className="text-2xl mb-2 font-semibold">{vowel.name}</div>
                <div className="text-muted-foreground mb-3 italic">{vowel.pronunciation}</div>
                <div className="text-sm border-t border-border pt-3">
                  <strong>Example:</strong> {vowel.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consonants Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Consonants (വ്യഞ്ജനങ്ങൾ)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {consonants.map((consonant, index) => (
              <div key={index} className="number-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl font-bold text-primary">{consonant.letter}</div>
                  <Button
                    onClick={() => playAudio(index + vowels.length)}
                    className={`audio-button ${playingAudio === index + vowels.length ? 'animate-pulse' : ''}`}
                    size="sm"
                  >
                    🔊
                  </Button>
                </div>
                <div className="text-2xl mb-2 font-semibold">{consonant.name}</div>
                <div className="text-muted-foreground mb-3 italic">{consonant.pronunciation}</div>
                <div className="text-sm border-t border-border pt-3">
                  <strong>Example:</strong> {consonant.example}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalayalamAlphabet;
