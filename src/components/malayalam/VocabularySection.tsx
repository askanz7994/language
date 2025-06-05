
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VocabularyWord {
  malayalam: string;
  transliteration: string;
  english: string;
}

interface VocabularySectionProps {
  vocabulary: VocabularyWord[];
}

const VocabularySection = ({ vocabulary }: VocabularySectionProps) => {
  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Vocabulary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {vocabulary.map((word: VocabularyWord, index: number) => (
            <div key={index} className="word-card">
              <div className="text-lg font-bold text-primary mb-1">{word.malayalam}</div>
              <div className="text-sm text-muted-foreground mb-1">/{word.transliteration}/</div>
              <div className="text-base">{word.english}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VocabularySection;
