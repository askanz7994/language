
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LanguageSelection from "./pages/LanguageSelection";
import LearnMalayalam from "./pages/LearnMalayalam";
import LearnEnglish from "./pages/LearnEnglish";
import LearnHindi from "./pages/LearnHindi";
import MalayalamNumbers from "./pages/MalayalamNumbers";
import MalayalamWords from "./pages/MalayalamWords";
import MalayalamParagraph from "./pages/MalayalamParagraph";
import EnglishNumbers from "./pages/EnglishNumbers";
import EnglishWords from "./pages/EnglishWords";
import EnglishParagraph from "./pages/EnglishParagraph";
import HindiNumbers from "./pages/HindiNumbers";
import HindiWords from "./pages/HindiWords";
import HindiParagraph from "./pages/HindiParagraph";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/languages" element={<LanguageSelection />} />
          <Route path="/learn-malayalam" element={<LearnMalayalam />} />
          <Route path="/learn-english" element={<LearnEnglish />} />
          <Route path="/learn-hindi" element={<LearnHindi />} />
          <Route path="/malayalam/numbers" element={<MalayalamNumbers />} />
          <Route path="/malayalam/words" element={<MalayalamWords />} />
          <Route path="/malayalam/paragraph" element={<MalayalamParagraph />} />
          <Route path="/english/numbers" element={<EnglishNumbers />} />
          <Route path="/english/words" element={<EnglishWords />} />
          <Route path="/english/paragraph" element={<EnglishParagraph />} />
          <Route path="/hindi/numbers" element={<HindiNumbers />} />
          <Route path="/hindi/words" element={<HindiWords />} />
          <Route path="/hindi/paragraph" element={<HindiParagraph />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
