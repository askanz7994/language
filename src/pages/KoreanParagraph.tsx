
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const KoreanParagraph = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const paragraphs = [
    {
      korean: "안녕하세요. 제 이름은 김민수입니다. 저는 학생이고 서울에 살고 있습니다. 한국어를 공부하는 것을 좋아합니다.",
      romanization: "Annyeonghaseyo. Je ireumeun Kim Minsu imnida. Jeoneun haksaengigo seoure salgo itsseumnida. Hangugeoreul gongbuhaneun geoseul joahamnida.",
      english: "Hello. My name is Kim Minsu. I am a student and I live in Seoul. I like studying Korean.",
      title: "Self Introduction"
    },
    {
      korean: "오늘은 날씨가 참 좋습니다. 하늘이 맑고 파랗습니다. 친구와 함께 공원에 갑니다. 우리는 매우 행복합니다.",
      romanization: "Oneureun nalssiga cham jotseumnida. Haneuri makgo paratseumnida. Chinguwa hamkke gongwone gamnida. Urineun maeu haengbokhamnida.",
      english: "Today the weather is really nice. The sky is clear and blue. I'm going to the park with my friend. We are very happy.",
      title: "A Beautiful Day"
    },
    {
      korean: "우리 가족은 네 명입니다. 아버지, 어머니, 남동생 그리고 저입니다. 우리는 함께 살며 서로 사랑합니다.",
      romanization: "Uri gajogeun ne myeongimnida. Abeoji, eomeoni, namdongssaeng geurigo jeoimnida. Urineun hamkke salmyeo seoro saranghamnida.",
      english: "Our family has four people. Father, mother, younger brother and me. We live together and love each other.",
      title: "My Family"
    }
  ];

  const currentItem = paragraphs[currentParagraph];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-korean" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Korean
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Korean Paragraphs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice reading Korean paragraphs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{currentItem.title}</h2>
            <div className="text-center mb-8">
              <div className="text-2xl leading-relaxed mb-6">{currentItem.korean}</div>
              <div className="text-lg text-muted-foreground mb-6">{currentItem.romanization}</div>
              <div className="text-lg font-medium">{currentItem.english}</div>
            </div>
            <div className="text-center">
              <Button className="glow-button">
                <Volume2 className="mr-2 h-4 w-4" />
                Play Sound
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button 
              onClick={() => setCurrentParagraph(Math.max(0, currentParagraph - 1))}
              disabled={currentParagraph === 0}
              variant="outline"
            >
              Previous
            </Button>
            
            <span className="text-muted-foreground">
              {currentParagraph + 1} of {paragraphs.length}
            </span>
            
            <Button 
              onClick={() => setCurrentParagraph(Math.min(paragraphs.length - 1, currentParagraph + 1))}
              disabled={currentParagraph === paragraphs.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoreanParagraph;
