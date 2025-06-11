
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import EnglishAudioPlayer from "./EnglishAudioPlayer";
import { WordTiming } from "@/data/englishTopicData";

interface EnglishTopicContentDisplayProps {
  title: string;
  english: string;
  audioFile?: string;
  wordTimings?: WordTiming[];
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const EnglishTopicContentDisplay = ({ 
  title, 
  english, 
  audioFile,
  wordTimings,
  isRecording, 
  onStartRecording, 
  onStopRecording 
}: EnglishTopicContentDisplayProps) => {
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);

  const handleWordHighlight = (wordIndex: number) => {
    setHighlightedWordIndex(wordIndex === -1 ? null : wordIndex);
  };

  const handleReadingStop = () => {
    setHighlightedWordIndex(null);
  };

  const renderEnglishWithHighlight = () => {
    const words = english.split(/(\s+)/); // Keep spaces in the split
    let wordIndex = 0;
    
    return words.map((segment, index) => {
      if (segment.trim() === '') {
        // This is whitespace, return as is
        return segment;
      }
      
      const isHighlighted = highlightedWordIndex === wordIndex;
      const currentWordIndex = wordIndex;
      wordIndex++;
      
      return (
        <span
          key={`${currentWordIndex}-${index}`}
          className={`transition-all duration-200 text-xs md:text-lg ${
            isHighlighted 
              ? "border-2 border-primary text-primary font-semibold rounded px-1" 
              : ""
          }`}
        >
          {segment}
        </span>
      );
    });
  };

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl mb-4">{title}</CardTitle>
        
        <EnglishAudioPlayer
          englishText={english}
          audioFile={audioFile}
          wordTimings={wordTimings}
          isRecording={isRecording}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onWordHighlight={handleWordHighlight}
          onReadingStop={handleReadingStop}
        />
      </CardHeader>
      <CardContent>
        <div className="text-xs md:text-lg leading-relaxed mb-4 p-4 bg-muted rounded-lg">
          {renderEnglishWithHighlight()}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnglishTopicContentDisplay;
