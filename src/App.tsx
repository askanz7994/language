
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LanguageSelection from "./pages/LanguageSelection";
import LearnMalayalam from "./pages/LearnMalayalam";
import LearnEnglish from "./pages/LearnEnglish";
import LearnHindi from "./pages/LearnHindi";
import LearnSpanish from "./pages/LearnSpanish";
import LearnFrench from "./pages/LearnFrench";
import LearnGerman from "./pages/LearnGerman";
import MalayalamNumbers from "./pages/MalayalamNumbers";
import MalayalamWords from "./pages/MalayalamWords";
import MalayalamParagraph from "./pages/MalayalamParagraph";
import EnglishNumbers from "./pages/EnglishNumbers";
import EnglishWords from "./pages/EnglishWords";
import EnglishParagraph from "./pages/EnglishParagraph";
import HindiNumbers from "./pages/HindiNumbers";
import HindiWords from "./pages/HindiWords";
import HindiParagraph from "./pages/HindiParagraph";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/languages" element={<LanguageSelection />} />
            
            {/* Malayalam */}
            <Route path="/learn-malayalam" element={<LearnMalayalam />} />
            <Route path="/malayalam/numbers" element={<MalayalamNumbers />} />
            <Route path="/malayalam/words" element={<MalayalamWords />} />
            <Route path="/malayalam/paragraph" element={<MalayalamParagraph />} />
            
            {/* English */}
            <Route path="/learn-english" element={<LearnEnglish />} />
            <Route path="/english/numbers" element={<EnglishNumbers />} />
            <Route path="/english/words" element={<EnglishWords />} />
            <Route path="/english/paragraph" element={<EnglishParagraph />} />
            
            {/* Hindi */}
            <Route path="/learn-hindi" element={<LearnHindi />} />
            <Route path="/hindi/numbers" element={<HindiNumbers />} />
            <Route path="/hindi/words" element={<HindiWords />} />
            <Route path="/hindi/paragraph" element={<HindiParagraph />} />
            
            {/* Spanish */}
            <Route path="/learn-spanish" element={<LearnSpanish />} />
            <Route path="/spanish/numbers" element={<NotFound />} />
            <Route path="/spanish/words" element={<NotFound />} />
            <Route path="/spanish/paragraph" element={<NotFound />} />
            
            {/* French */}
            <Route path="/learn-french" element={<LearnFrench />} />
            <Route path="/french/numbers" element={<NotFound />} />
            <Route path="/french/words" element={<NotFound />} />
            <Route path="/french/paragraph" element={<NotFound />} />
            
            {/* German */}
            <Route path="/learn-german" element={<LearnGerman />} />
            <Route path="/german/numbers" element={<NotFound />} />
            <Route path="/german/words" element={<NotFound />} />
            <Route path="/german/paragraph" element={<NotFound />} />
            
            {/* Placeholder routes for other languages */}
            <Route path="/learn-chinese" element={<NotFound />} />
            <Route path="/learn-japanese" element={<NotFound />} />
            <Route path="/learn-korean" element={<NotFound />} />
            <Route path="/learn-portuguese" element={<NotFound />} />
            <Route path="/learn-russian" element={<NotFound />} />
            <Route path="/learn-arabic" element={<NotFound />} />
            <Route path="/learn-indonesian" element={<NotFound />} />
            <Route path="/learn-italian" element={<NotFound />} />
            <Route path="/learn-turkish" element={<NotFound />} />
            <Route path="/learn-vietnamese" element={<NotFound />} />
            <Route path="/learn-thai" element={<NotFound />} />
            <Route path="/learn-polish" element={<NotFound />} />
            <Route path="/learn-dutch" element={<NotFound />} />
            <Route path="/learn-swedish" element={<NotFound />} />
            <Route path="/learn-telugu" element={<NotFound />} />
            <Route path="/learn-urdu" element={<NotFound />} />
            <Route path="/learn-kannada" element={<NotFound />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
