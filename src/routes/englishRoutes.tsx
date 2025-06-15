
import { Route } from "react-router-dom";
import LearnEnglish from "@/pages/LearnEnglish";
import EnglishAlphabets from "@/pages/EnglishAlphabets";
import EnglishNumbers from "@/pages/EnglishNumbers";
import EnglishWords from "@/pages/EnglishWords";
import EnglishGrammar from "@/pages/EnglishGrammar";
import EnglishParagraph from "@/pages/EnglishParagraph";
import EnglishTopicContent from "@/pages/EnglishTopicContent";
import CreditGuard from "@/components/CreditGuard";

export const englishRoutes = (
  <>
    <Route path="/learn-english" element={<LearnEnglish />} />
    <Route path="/english/alphabets" element={<EnglishAlphabets />} />
    <Route path="/english/numbers" element={<EnglishNumbers />} />
    <Route path="/english/words" element={<EnglishWords />} />
    <Route path="/english/grammar" element={<EnglishGrammar />} />
    <Route path="/english/paragraph" element={<EnglishParagraph />} />
    <Route 
      path="/english/paragraph/:topicId" 
      element={
        <CreditGuard requiredCredits={1} periodicDeduction>
          <EnglishTopicContent />
        </CreditGuard>
      } 
    />
  </>
);
