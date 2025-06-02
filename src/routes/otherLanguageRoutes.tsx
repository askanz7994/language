
import { Route } from "react-router-dom";
import LearnChinese from "@/pages/LearnChinese";
import ChineseAlphabet from "@/pages/ChineseAlphabet";
import ChineseNumbers from "@/pages/ChineseNumbers";
import ChineseWords from "@/pages/ChineseWords";
import ChineseParagraph from "@/pages/ChineseParagraph";
import LearnJapanese from "@/pages/LearnJapanese";
import JapaneseNumbers from "@/pages/JapaneseNumbers";
import JapaneseWords from "@/pages/JapaneseWords";
import JapaneseParagraph from "@/pages/JapaneseParagraph";
import LearnKorean from "@/pages/LearnKorean";
import KoreanNumbers from "@/pages/KoreanNumbers";
import KoreanWords from "@/pages/KoreanWords";
import KoreanParagraph from "@/pages/KoreanParagraph";
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
    <Route path="/chinese/alphabet" element={<ChineseAlphabet />} />
    <Route path="/chinese/numbers" element={<ChineseNumbers />} />
    <Route path="/chinese/words" element={<ChineseWords />} />
    <Route path="/chinese/paragraph" element={<ChineseParagraph />} />
    
    {/* Japanese */}
    <Route path="/learn-japanese" element={<LearnJapanese />} />
    <Route path="/japanese/alphabet" element={<NotFound />} />
    <Route path="/japanese/numbers" element={<JapaneseNumbers />} />
    <Route path="/japanese/words" element={<JapaneseWords />} />
    <Route path="/japanese/paragraph" element={<JapaneseParagraph />} />
    
    {/* Korean */}
    <Route path="/learn-korean" element={<LearnKorean />} />
    <Route path="/korean/alphabet" element={<NotFound />} />
    <Route path="/korean/numbers" element={<KoreanNumbers />} />
    <Route path="/korean/words" element={<KoreanWords />} />
    <Route path="/korean/paragraph" element={<KoreanParagraph />} />
    
    {/* Portuguese */}
    <Route path="/learn-portuguese" element={<LearnPortuguese />} />
    <Route path="/portuguese/alphabet" element={<NotFound />} />
    <Route path="/portuguese/numbers" element={<NotFound />} />
    <Route path="/portuguese/words" element={<NotFound />} />
    <Route path="/portuguese/paragraph" element={<NotFound />} />
    
    {/* Russian */}
    <Route path="/learn-russian" element={<LearnRussian />} />
    <Route path="/russian/alphabet" element={<NotFound />} />
    <Route path="/russian/numbers" element={<NotFound />} />
    <Route path="/russian/words" element={<NotFound />} />
    <Route path="/russian/paragraph" element={<NotFound />} />
    
    {/* Arabic */}
    <Route path="/learn-arabic" element={<LearnArabic />} />
    <Route path="/arabic/alphabet" element={<NotFound />} />
    <Route path="/arabic/numbers" element={<NotFound />} />
    <Route path="/arabic/words" element={<NotFound />} />
    <Route path="/arabic/paragraph" element={<NotFound />} />
    
    {/* Indonesian */}
    <Route path="/learn-indonesian" element={<LearnIndonesian />} />
    <Route path="/indonesian/alphabet" element={<NotFound />} />
    <Route path="/indonesian/numbers" element={<NotFound />} />
    <Route path="/indonesian/words" element={<NotFound />} />
    <Route path="/indonesian/paragraph" element={<NotFound />} />
    
    {/* Italian */}
    <Route path="/learn-italian" element={<LearnItalian />} />
    <Route path="/italian/alphabet" element={<NotFound />} />
    <Route path="/italian/numbers" element={<NotFound />} />
    <Route path="/italian/words" element={<NotFound />} />
    <Route path="/italian/paragraph" element={<NotFound />} />
    
    {/* Turkish */}
    <Route path="/learn-turkish" element={<LearnTurkish />} />
    <Route path="/turkish/alphabet" element={<NotFound />} />
    <Route path="/turkish/numbers" element={<NotFound />} />
    <Route path="/turkish/words" element={<NotFound />} />
    <Route path="/turkish/paragraph" element={<NotFound />} />
    
    {/* Vietnamese */}
    <Route path="/learn-vietnamese" element={<LearnVietnamese />} />
    <Route path="/vietnamese/alphabet" element={<NotFound />} />
    <Route path="/vietnamese/numbers" element={<NotFound />} />
    <Route path="/vietnamese/words" element={<NotFound />} />
    <Route path="/vietnamese/paragraph" element={<NotFound />} />
    
    {/* Thai */}
    <Route path="/learn-thai" element={<LearnThai />} />
    <Route path="/thai/alphabet" element={<NotFound />} />
    <Route path="/thai/numbers" element={<NotFound />} />
    <Route path="/thai/words" element={<NotFound />} />
    <Route path="/thai/paragraph" element={<NotFound />} />
    
    {/* Polish */}
    <Route path="/learn-polish" element={<LearnPolish />} />
    <Route path="/polish/alphabet" element={<NotFound />} />
    <Route path="/polish/numbers" element={<NotFound />} />
    <Route path="/polish/words" element={<NotFound />} />
    <Route path="/polish/paragraph" element={<NotFound />} />
    
    {/* Dutch */}
    <Route path="/learn-dutch" element={<LearnDutch />} />
    <Route path="/dutch/alphabet" element={<NotFound />} />
    <Route path="/dutch/numbers" element={<NotFound />} />
    <Route path="/dutch/words" element={<NotFound />} />
    <Route path="/dutch/paragraph" element={<NotFound />} />
    
    {/* Swedish */}
    <Route path="/learn-swedish" element={<LearnSwedish />} />
    <Route path="/swedish/alphabet" element={<NotFound />} />
    <Route path="/swedish/numbers" element={<NotFound />} />
    <Route path="/swedish/words" element={<NotFound />} />
    <Route path="/swedish/paragraph" element={<NotFound />} />
    
    {/* Telugu */}
    <Route path="/learn-telugu" element={<LearnTelugu />} />
    <Route path="/telugu/alphabet" element={<NotFound />} />
    <Route path="/telugu/numbers" element={<NotFound />} />
    <Route path="/telugu/words" element={<NotFound />} />
    <Route path="/telugu/paragraph" element={<NotFound />} />
    
    {/* Urdu */}
    <Route path="/learn-urdu" element={<LearnUrdu />} />
    <Route path="/urdu/alphabet" element={<NotFound />} />
    <Route path="/urdu/numbers" element={<NotFound />} />
    <Route path="/urdu/words" element={<NotFound />} />
    <Route path="/urdu/paragraph" element={<NotFound />} />
    
    {/* Kannada */}
    <Route path="/learn-kannada" element={<LearnKannada />} />
    <Route path="/kannada/alphabet" element={<NotFound />} />
    <Route path="/kannada/numbers" element={<NotFound />} />
    <Route path="/kannada/words" element={<NotFound />} />
    <Route path="/kannada/paragraph" element={<NotFound />} />
  </>
);
