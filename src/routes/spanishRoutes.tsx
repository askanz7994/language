
import { Route } from "react-router-dom";
import LearnSpanish from "@/pages/LearnSpanish";
import SpanishAlphabets from "@/pages/SpanishAlphabets";
import SpanishNumbers from "@/pages/SpanishNumbers";
import SpanishWords from "@/pages/SpanishWords";
import SpanishParagraph from "@/pages/SpanishParagraph";

export const spanishRoutes = (
  <>
    <Route path="/learn-spanish" element={<LearnSpanish />} />
    <Route path="/spanish/alphabets" element={<SpanishAlphabets />} />
    <Route path="/spanish/numbers" element={<SpanishNumbers />} />
    <Route path="/spanish/words" element={<SpanishWords />} />
    <Route path="/spanish/paragraph" element={<SpanishParagraph />} />
  </>
);
