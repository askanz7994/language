
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

const ChineseParagraph = () => {
  const [currentParagraph, setCurrentParagraph] = useState(0);

  const paragraphs = [
    {
      chinese: "我叫李华。我是学生。我住在北京。我喜欢学习汉语。",
      pinyin: "Wǒ jiào Lǐ Huá. Wǒ shì xuéshēng. Wǒ zhù zài Běijīng. Wǒ xǐhuān xuéxí Hànyǔ.",
      english: "My name is Li Hua. I am a student. I live in Beijing. I like learning Chinese.",
      title: "Self Introduction"
    },
    {
      chinese: "今天天气很好。太阳很亮。我和朋友去公园。我们很高兴。",
      pinyin: "Jīntiān tiānqì hěn hǎo. Tàiyáng hěn liàng. Wǒ hé péngyǒu qù gōngyuán. Wǒmen hěn gāoxìng.",
      english: "Today the weather is very good. The sun is very bright. My friend and I go to the park. We are very happy.",
      title: "A Good Day"
    },
    {
      chinese: "我的家有四个人。爸爸、妈妈、弟弟和我。我们住在一起，很幸福。",
      pinyin: "Wǒ de jiā yǒu sì gè rén. Bàba, māma, dìdi hé wǒ. Wǒmen zhù zài yīqǐ, hěn xìngfú.",
      english: "My family has four people. Dad, mom, younger brother and me. We live together and are very happy.",
      title: "My Family"
    }
  ];

  const currentItem = paragraphs[currentParagraph];

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-chinese" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learn Chinese
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Chinese Paragraphs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practice reading Chinese paragraphs
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{currentItem.title}</h2>
            <div className="text-center mb-8">
              <div className="text-2xl leading-relaxed mb-6">{currentItem.chinese}</div>
              <div className="text-lg text-muted-foreground mb-6">{currentItem.pinyin}</div>
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

export default ChineseParagraph;
