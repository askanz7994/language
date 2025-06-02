
import { Route } from "react-router-dom";
import LearnMalayalam from "@/pages/LearnMalayalam";
import MalayalamNumbers from "@/pages/MalayalamNumbers";
import MalayalamWords from "@/pages/MalayalamWords";
import MalayalamParagraph from "@/pages/MalayalamParagraph";

export const malayalamRoutes = (
  <>
    <Route path="/learn-malayalam" element={<LearnMalayalam />} />
    <Route path="/malayalam/numbers" element={<MalayalamNumbers />} />
    <Route path="/malayalam/words" element={<MalayalamWords />} />
    <Route path="/malayalam/paragraph" element={<MalayalamParagraph />} />
  </>
);
