import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EnglishAudioControls from "./EnglishAudioControls";
interface EnglishTopicContentDisplayProps {
  title: string;
  english: string;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}
const EnglishTopicContentDisplay = ({
  title,
  english,
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
    const words = english.split(' ');
    return words.map((word, index) => <span key={index} className="font-normal text-xs">
        {word}
        {index < words.length - 1 ? ' ' : ''}
      </span>);
  };
  return <Card className="language-card">
      <CardHeader>
        <CardTitle className="mb-4 text-xl">{title}</CardTitle>
        
        <EnglishAudioControls englishText={english} isRecording={isRecording} onStartRecording={onStartRecording} onStopRecording={onStopRecording} onWordHighlight={handleWordHighlight} onReadingStop={handleReadingStop} />
      </CardHeader>
      <CardContent>
        <div className="text-lg leading-relaxed mb-4 p-4 bg-muted rounded-lg">
          {renderEnglishWithHighlight()}
        </div>
      </CardContent>
    </Card>;
};
export default EnglishTopicContentDisplay;