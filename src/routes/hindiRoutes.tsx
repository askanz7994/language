
import { Route } from "react-router-dom";
import LearnHindi from "@/pages/LearnHindi";
import HindiNumbers from "@/pages/HindiNumbers";
import HindiWords from "@/pages/HindiWords";
import HindiParagraph from "@/pages/HindiParagraph";

export const hindiRoutes = (
  <>
    <Route path="/learn-hindi" element={<LearnHindi />} />
    <Route path="/hindi/numbers" element={<HindiNumbers />} />
    <Route path="/hindi/words" element={<HindiWords />} />
    <Route path="/hindi/paragraph" element={<HindiParagraph />} />
  </>
);
