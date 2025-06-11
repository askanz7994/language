
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { GrammarTopic } from "@/data/grammarTopicsData";

interface GrammarTopicCardProps {
  topic: GrammarTopic;
  index: number;
  isPlaying: boolean;
  onPlayAudio: (index: number) => void;
  translatedExplanation: string;
}

export const GrammarTopicCard = ({ 
  topic, 
  index, 
  isPlaying, 
  onPlayAudio, 
  translatedExplanation 
}: GrammarTopicCardProps) => {
  return (
    <div className="word-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="text-xl font-bold text-primary mb-2">{topic.topic}</div>
          <div 
            className="text-lg font-medium mb-2 text-foreground" 
            dangerouslySetInnerHTML={{ __html: topic.example }}
          />
          <div className="text-sm text-muted-foreground">
            {translatedExplanation}
          </div>
        </div>
        <Button
          onClick={() => onPlayAudio(index)}
          className={`audio-button ml-4 ${isPlaying ? 'animate-pulse' : ''}`}
          size="sm"
          disabled={isPlaying}
        >
          <Play className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
