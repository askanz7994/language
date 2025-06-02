
import { Route } from "react-router-dom";
import LearnEnglish from "@/pages/LearnEnglish";
import EnglishAlphabets from "@/pages/EnglishAlphabets";
import EnglishNumbers from "@/pages/EnglishNumbers";
import EnglishWords from "@/pages/EnglishWords";
import EnglishParagraph from "@/pages/EnglishParagraph";

export const englishRoutes = (
  <>
    <Route path="/learn-english" element={<LearnEnglish />} />
    <Route path="/english/alphabets" element={<EnglishAlphabets />} />
    <Route path="/english/numbers" element={<EnglishNumbers />} />
    <Route path="/english/words" element={<EnglishWords />} />
    <Route path="/english/paragraph" element={<EnglishParagraph />} />
  </>
);
