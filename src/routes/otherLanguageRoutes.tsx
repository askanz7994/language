
import { Route } from "react-router-dom";
import LearnChinese from "@/pages/LearnChinese";
import LearnJapanese from "@/pages/LearnJapanese";
import LearnKorean from "@/pages/LearnKorean";
import LearnPortuguese from "@/pages/LearnPortuguese";
import LearnRussian from "@/pages/LearnRussian";
import LearnArabic from "@/pages/LearnArabic";
import LearnIndonesian from "@/pages/LearnIndonesian";
import LearnItalian from "@/pages/LearnItalian";
import LearnTurkish from "@/pages/LearnTurkish";
import LearnVietnamese from "@/pages/LearnVietnamese";
import LearnThai from "@/pages/LearnThai";
import LearnPolish from "@/pages/LearnPolish";
import LearnDutch from "@/pages/LearnDutch";
import LearnSwedish from "@/pages/LearnSwedish";
import LearnTelugu from "@/pages/LearnTelugu";
import LearnUrdu from "@/pages/LearnUrdu";
import LearnKannada from "@/pages/LearnKannada";
import NotFound from "@/pages/NotFound";

export const otherLanguageRoutes = (
  <>
    {/* Chinese */}
    <Route path="/learn-chinese" element={<LearnChinese />} />
    <Route path="/chinese/numbers" element={<NotFound />} />
    <Route path="/chinese/words" element={<NotFound />} />
    <Route path="/chinese/paragraph" element={<NotFound />} />
    
    {/* Japanese */}
    <Route path="/learn-japanese" element={<LearnJapanese />} />
    <Route path="/japanese/numbers" element={<NotFound />} />
    <Route path="/japanese/words" element={<NotFound />} />
    <Route path="/japanese/paragraph" element={<NotFound />} />
    
    {/* Korean */}
    <Route path="/learn-korean" element={<LearnKorean />} />
    <Route path="/korean/numbers" element={<NotFound />} />
    <Route path="/korean/words" element={<NotFound />} />
    <Route path="/korean/paragraph" element={<NotFound />} />
    
    {/* Portuguese */}
    <Route path="/learn-portuguese" element={<LearnPortuguese />} />
    <Route path="/portuguese/numbers" element={<NotFound />} />
    <Route path="/portuguese/words" element={<NotFound />} />
    <Route path="/portuguese/paragraph" element={<NotFound />} />
    
    {/* Russian */}
    <Route path="/learn-russian" element={<LearnRussian />} />
    <Route path="/russian/numbers" element={<NotFound />} />
    <Route path="/russian/words" element={<NotFound />} />
    <Route path="/russian/paragraph" element={<NotFound />} />
    
    {/* Arabic */}
    <Route path="/learn-arabic" element={<LearnArabic />} />
    <Route path="/arabic/numbers" element={<NotFound />} />
    <Route path="/arabic/words" element={<NotFound />} />
    <Route path="/arabic/paragraph" element={<NotFound />} />
    
    {/* Indonesian */}
    <Route path="/learn-indonesian" element={<LearnIndonesian />} />
    <Route path="/indonesian/numbers" element={<NotFound />} />
    <Route path="/indonesian/words" element={<NotFound />} />
    <Route path="/indonesian/paragraph" element={<NotFound />} />
    
    {/* Italian */}
    <Route path="/learn-italian" element={<LearnItalian />} />
    <Route path="/italian/numbers" element={<NotFound />} />
    <Route path="/italian/words" element={<NotFound />} />
    <Route path="/italian/paragraph" element={<NotFound />} />
    
    {/* Turkish */}
    <Route path="/learn-turkish" element={<LearnTurkish />} />
    <Route path="/turkish/numbers" element={<NotFound />} />
    <Route path="/turkish/words" element={<NotFound />} />
    <Route path="/turkish/paragraph" element={<NotFound />} />
    
    {/* Vietnamese */}
    <Route path="/learn-vietnamese" element={<LearnVietnamese />} />
    <Route path="/vietnamese/numbers" element={<NotFound />} />
    <Route path="/vietnamese/words" element={<NotFound />} />
    <Route path="/vietnamese/paragraph" element={<NotFound />} />
    
    {/* Thai */}
    <Route path="/learn-thai" element={<LearnThai />} />
    <Route path="/thai/numbers" element={<NotFound />} />
    <Route path="/thai/words" element={<NotFound />} />
    <Route path="/thai/paragraph" element={<NotFound />} />
    
    {/* Polish */}
    <Route path="/learn-polish" element={<LearnPolish />} />
    <Route path="/polish/numbers" element={<NotFound />} />
    <Route path="/polish/words" element={<NotFound />} />
    <Route path="/polish/paragraph" element={<NotFound />} />
    
    {/* Dutch */}
    <Route path="/learn-dutch" element={<LearnDutch />} />
    <Route path="/dutch/numbers" element={<NotFound />} />
    <Route path="/dutch/words" element={<NotFound />} />
    <Route path="/dutch/paragraph" element={<NotFound />} />
    
    {/* Swedish */}
    <Route path="/learn-swedish" element={<LearnSwedish />} />
    <Route path="/swedish/numbers" element={<NotFound />} />
    <Route path="/swedish/words" element={<NotFound />} />
    <Route path="/swedish/paragraph" element={<NotFound />} />
    
    {/* Telugu */}
    <Route path="/learn-telugu" element={<LearnTelugu />} />
    <Route path="/telugu/numbers" element={<NotFound />} />
    <Route path="/telugu/words" element={<NotFound />} />
    <Route path="/telugu/paragraph" element={<NotFound />} />
    
    {/* Urdu */}
    <Route path="/learn-urdu" element={<LearnUrdu />} />
    <Route path="/urdu/numbers" element={<NotFound />} />
    <Route path="/urdu/words" element={<NotFound />} />
    <Route path="/urdu/paragraph" element={<NotFound />} />
    
    {/* Kannada */}
    <Route path="/learn-kannada" element={<LearnKannada />} />
    <Route path="/kannada/numbers" element={<NotFound />} />
    <Route path="/kannada/words" element={<NotFound />} />
    <Route path="/kannada/paragraph" element={<NotFound />} />
  </>
);
