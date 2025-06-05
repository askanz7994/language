
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AudioControls from "./AudioControls";

interface TopicContentDisplayProps {
  title: string;
  malayalam: string;
  english: string;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

const TopicContentDisplay = ({ 
  title, 
  malayalam, 
  english, 
  isRecording, 
  onStartRecording, 
  onStopRecording 
}: TopicContentDisplayProps) => {
  const [showTranslation, setShowTranslation] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleWordHighlight = (wordIndex: number) => {
    setHighlightedWordIndex(wordIndex);
  };

  const handleReadingStop = () => {
    setHighlightedWordIndex(null);
  };

  const renderMalayalamWithHighlight = () => {
    const words = malayalam.split(' ');
    return words.map((word, index) => (
      <span
        key={index}
        className={highlightedWordIndex === index ? "underline decoration-black decoration-2" : ""}
      >
        {word}
        {index < words.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">{title}</CardTitle>
        
        {/* Audio Controls moved to top */}
        <AudioControls
          malayalamText={malayalam}
          isRecording={isRecording}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onWordHighlight={handleWordHighlight}
          onReadingStop={handleReadingStop}
        />
      </CardHeader>
      <CardContent>
        {/* Malayalam Text with word highlighting */}
        <div className="text-lg leading-relaxed mb-4 p-4 bg-muted rounded-lg">
          {renderMalayalamWithHighlight()}
        </div>
        
        {/* Translation */}
        <div className="mt-6">
          <div className="flex justify-center mb-4">
            <Button
              onClick={toggleTranslation}
              variant={showTranslation ? "default" : "outline"}
              className="glow-button"
            >
              {showTranslation ? "Hide" : "Show"} Translation
            </Button>
          </div>
          
          {showTranslation && (
            <div>
              <h4 className="text-lg font-semibold mb-2">English Translation:</h4>
              <div className="text-base leading-relaxed p-4 bg-muted/50 rounded-lg">
                {english}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicContentDisplay;
