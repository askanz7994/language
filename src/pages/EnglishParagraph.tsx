
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const EnglishParagraph = () => {
  const [playingAudio, setPlayingAudio] = useState(false);

  const paragraph = {
    title: "My Daily Routine",
    text: "My name is Sarah. I wake up at six o'clock in the morning. After waking up, I brush my teeth and take a shower. I eat my breakfast at eight o'clock. Usually, I have cereal or toast with jam. Then I go to school by bus. At school, I attend classes and meet my friends. In the evening, I do my homework and play games. At night, I read books and spend time with my family. We often watch movies together or talk about our day. Before going to bed, I prepare my clothes for the next day and set my alarm clock."
  };

  const playAudio = () => {
    setPlayingAudio(true);
    setTimeout(() => setPlayingAudio(false), 3000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{paragraph.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read and understand an English paragraph about daily routine
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="language-card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Reading Passage</h2>
              <Button
                onClick={playAudio}
                className={`audio-button ${playingAudio ? 'animate-pulse' : ''}`}
              >
                🔊 Play Audio
              </Button>
            </div>
            <div className="text-lg leading-relaxed p-6 bg-muted rounded-lg">
              {paragraph.text}
            </div>
          </div>

          <div className="language-card">
            <h3 className="text-2xl font-bold mb-6">Key Vocabulary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">routine</span>
                <span className="text-muted-foreground">daily activities</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">shower</span>
                <span className="text-muted-foreground">wash with water</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">cereal</span>
                <span className="text-muted-foreground">breakfast food</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded">
                <span className="font-semibold">homework</span>
                <span className="text-muted-foreground">school assignments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishParagraph;
