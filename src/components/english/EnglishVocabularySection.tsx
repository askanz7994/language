import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Vocabulary {
  word: string;
  meaning: string;
}
interface EnglishVocabularySectionProps {
  vocabulary: Vocabulary[];
}
const EnglishVocabularySection = ({
  vocabulary
}: EnglishVocabularySectionProps) => {
  return <Card className="language-card mx-0 px-0">
      <CardHeader>
        <CardTitle className="text-xl">Key Vocabulary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {vocabulary.map((item, index) => <div key={index} className="word-card mx-0 px-[3px]">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-primary text-xs">{item.word}</span>
                <span className="text-muted-foreground font-normal text-xs">{item.meaning}</span>
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>;
};
export default EnglishVocabularySection;