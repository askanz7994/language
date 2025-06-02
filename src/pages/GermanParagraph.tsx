
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const GermanParagraph = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const paragraphs = [
    {
      title: "Ein schöner Tag",
      german: "Heute ist ein schöner Tag. Die Sonne scheint hell am blauen Himmel. Ich gehe in den Park spazieren und sehe viele Blumen. Die Vögel singen fröhliche Lieder. Es ist warm und ich fühle mich sehr glücklich.",
      english: "Today is a beautiful day. The sun shines bright in the blue sky. I go for a walk in the park and see many flowers. The birds sing happy songs. It is warm and I feel very happy.",
      pronunciation: "/ˈhɔʏtə ɪst aɪn ˈʃøːnɐ taːk. diː ˈzɔnə ʃaɪnt hɛl am ˈblaʊən ˈhɪməl./"
    },
    {
      title: "Meine Familie",
      german: "Ich habe eine große Familie. Mein Vater arbeitet als Lehrer und meine Mutter ist Ärztin. Ich habe zwei Geschwister: einen Bruder und eine Schwester. Wir wohnen in einem schönen Haus mit einem Garten.",
      english: "I have a big family. My father works as a teacher and my mother is a doctor. I have two siblings: a brother and a sister. We live in a beautiful house with a garden.",
      pronunciation: "/ɪç ˈhaːbə aɪnə ˈɡroːsə faˈmiːliə. maɪn ˈfaːtɐ ˈaʁbaɪtət als ˈleːʁɐ./"
    },
    {
      title: "In der Schule",
      german: "Die Schule beginnt um acht Uhr morgens. Ich lerne Deutsch, Mathematik, Geschichte und Naturwissenschaften. Mein Lieblingsfach ist Deutsch, weil ich gerne lese und schreibe. Nach der Schule spiele ich mit meinen Freunden.",
      english: "School starts at eight o'clock in the morning. I learn German, mathematics, history, and science. My favorite subject is German because I like to read and write. After school, I play with my friends.",
      pronunciation: "/diː ˈʃuːlə bəˈɡɪnt ʊm axt uːɐ̯ ˈmɔʁɡəns./"
    }
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-german" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to German
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">German Paragraphs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice reading and understanding German through contextual paragraphs
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="paragraph-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">{paragraph.title}</h2>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  🔊
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">German:</h3>
                  <p className="text-lg leading-relaxed">{paragraph.german}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">English Translation:</h3>
                  <p className="text-muted-foreground leading-relaxed">{paragraph.english}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pronunciation Guide:</h3>
                  <p className="text-sm text-muted-foreground italic">{paragraph.pronunciation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GermanParagraph;
