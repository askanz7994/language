
import { Route } from "react-router-dom";
import LearnFrench from "@/pages/LearnFrench";
import FrenchAlphabets from "@/pages/FrenchAlphabets";
import FrenchNumbers from "@/pages/FrenchNumbers";
import FrenchWords from "@/pages/FrenchWords";
import FrenchParagraph from "@/pages/FrenchParagraph";

export const frenchRoutes = (
  <>
    <Route path="/learn-french" element={<LearnFrench />} />
    <Route path="/french/alphabets" element={<FrenchAlphabets />} />
    <Route path="/french/numbers" element={<FrenchNumbers />} />
    <Route path="/french/words" element={<FrenchWords />} />
    <Route path="/french/paragraph" element={<FrenchParagraph />} />
  </>
);
