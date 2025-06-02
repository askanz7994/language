
import { Route } from "react-router-dom";
import LearnGerman from "@/pages/LearnGerman";
import GermanAlphabets from "@/pages/GermanAlphabets";
import GermanNumbers from "@/pages/GermanNumbers";
import GermanWords from "@/pages/GermanWords";
import GermanParagraph from "@/pages/GermanParagraph";

export const germanRoutes = (
  <>
    <Route path="/learn-german" element={<LearnGerman />} />
    <Route path="/german/alphabets" element={<GermanAlphabets />} />
    <Route path="/german/numbers" element={<GermanNumbers />} />
    <Route path="/german/words" element={<GermanWords />} />
    <Route path="/german/paragraph" element={<GermanParagraph />} />
  </>
);
