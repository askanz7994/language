
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Vocabulary {
  word: string;
  meaning: string;
}

interface EnglishVocabularySectionProps {
  vocabulary: Vocabulary[];
}

const EnglishVocabularySection = ({ vocabulary }: EnglishVocabularySectionProps) => {
  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Key Vocabulary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {vocabulary.map((item, index) => (
            <div key={index} className="word-card">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-primary">{item.word}</span>
                <span className="text-muted-foreground">{item.meaning}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnglishVocabularySection;
