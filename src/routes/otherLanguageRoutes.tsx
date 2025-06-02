
import { Route } from "react-router-dom";
import LearnChinese from "@/pages/LearnChinese";
import ChineseAlphabets from "@/pages/ChineseAlphabets";
import ChineseNumbers from "@/pages/ChineseNumbers";
import ChineseWords from "@/pages/ChineseWords";
import ChineseParagraph from "@/pages/ChineseParagraph";
import LearnJapanese from "@/pages/LearnJapanese";
import JapaneseAlphabets from "@/pages/JapaneseAlphabets";
import JapaneseNumbers from "@/pages/JapaneseNumbers";
import JapaneseWords from "@/pages/JapaneseWords";
import JapaneseParagraph from "@/pages/JapaneseParagraph";
import LearnKorean from "@/pages/LearnKorean";
import KoreanAlphabets from "@/pages/KoreanAlphabets";
import KoreanNumbers from "@/pages/KoreanNumbers";
import KoreanWords from "@/pages/KoreanWords";
import KoreanParagraph from "@/pages/KoreanParagraph";
import LearnPortuguese from "@/pages/LearnPortuguese";
import PortugueseAlphabets from "@/pages/PortugueseAlphabets";
import LearnRussian from "@/pages/LearnRussian";
import RussianAlphabets from "@/pages/RussianAlphabets";
import LearnArabic from "@/pages/LearnArabic";
import ArabicAlphabets from "@/pages/ArabicAlphabets";
import LearnIndonesian from "@/pages/LearnIndonesian";
import IndonesianAlphabets from "@/pages/IndonesianAlphabets";
import LearnItalian from "@/pages/LearnItalian";
import ItalianAlphabets from "@/pages/ItalianAlphabets";
import LearnTurkish from "@/pages/LearnTurkish";
import TurkishAlphabets from "@/pages/TurkishAlphabets";
import LearnVietnamese from "@/pages/LearnVietnamese";
import VietnameseAlphabets from "@/pages/VietnameseAlphabets";
import LearnThai from "@/pages/LearnThai";
import ThaiAlphabets from "@/pages/ThaiAlphabets";
import LearnPolish from "@/pages/LearnPolish";
import PolishAlphabets from "@/pages/PolishAlphabets";
import LearnDutch from "@/pages/LearnDutch";
import DutchAlphabets from "@/pages/DutchAlphabets";
import LearnSwedish from "@/pages/LearnSwedish";
import SwedishAlphabets from "@/pages/SwedishAlphabets";
import LearnTelugu from "@/pages/LearnTelugu";
import TeluguAlphabets from "@/pages/TeluguAlphabets";
import LearnUrdu from "@/pages/LearnUrdu";
import UrduAlphabets from "@/pages/UrduAlphabets";
import LearnKannada from "@/pages/LearnKannada";
import KannadaAlphabets from "@/pages/KannadaAlphabets";
import NotFound from "@/pages/NotFound";

export const otherLanguageRoutes = (
  <>
    {/* Chinese */}
    <Route path="/learn-chinese" element={<LearnChinese />} />
    <Route path="/chinese/alphabets" element={<ChineseAlphabets />} />
    <Route path="/chinese/numbers" element={<ChineseNumbers />} />
    <Route path="/chinese/words" element={<ChineseWords />} />
    <Route path="/chinese/paragraph" element={<ChineseParagraph />} />
    
    {/* Japanese */}
    <Route path="/learn-japanese" element={<LearnJapanese />} />
    <Route path="/japanese/alphabets" element={<JapaneseAlphabets />} />
    <Route path="/japanese/numbers" element={<JapaneseNumbers />} />
    <Route path="/japanese/words" element={<JapaneseWords />} />
    <Route path="/japanese/paragraph" element={<JapaneseParagraph />} />
    
    {/* Korean */}
    <Route path="/learn-korean" element={<LearnKorean />} />
    <Route path="/korean/alphabets" element={<KoreanAlphabets />} />
    <Route path="/korean/numbers" element={<KoreanNumbers />} />
    <Route path="/korean/words" element={<KoreanWords />} />
    <Route path="/korean/paragraph" element={<KoreanParagraph />} />
    
    {/* Portuguese */}
    <Route path="/learn-portuguese" element={<LearnPortuguese />} />
    <Route path="/portuguese/alphabets" element={<PortugueseAlphabets />} />
    <Route path="/portuguese/numbers" element={<NotFound />} />
    <Route path="/portuguese/words" element={<NotFound />} />
    <Route path="/portuguese/paragraph" element={<NotFound />} />
    
    {/* Russian */}
    <Route path="/learn-russian" element={<LearnRussian />} />
    <Route path="/russian/alphabets" element={<RussianAlphabets />} />
    <Route path="/russian/numbers" element={<NotFound />} />
    <Route path="/russian/words" element={<NotFound />} />
    <Route path="/russian/paragraph" element={<NotFound />} />
    
    {/* Arabic */}
    <Route path="/learn-arabic" element={<LearnArabic />} />
    <Route path="/arabic/alphabets" element={<ArabicAlphabets />} />
    <Route path="/arabic/numbers" element={<NotFound />} />
    <Route path="/arabic/words" element={<NotFound />} />
    <Route path="/arabic/paragraph" element={<NotFound />} />
    
    {/* Indonesian */}
    <Route path="/learn-indonesian" element={<LearnIndonesian />} />
    <Route path="/indonesian/alphabets" element={<IndonesianAlphabets />} />
    <Route path="/indonesian/numbers" element={<NotFound />} />
    <Route path="/indonesian/words" element={<NotFound />} />
    <Route path="/indonesian/paragraph" element={<NotFound />} />
    
    {/* Italian */}
    <Route path="/learn-italian" element={<LearnItalian />} />
    <Route path="/italian/alphabets" element={<ItalianAlphabets />} />
    <Route path="/italian/numbers" element={<NotFound />} />
    <Route path="/italian/words" element={<NotFound />} />
    <Route path="/italian/paragraph" element={<NotFound />} />
    
    {/* Turkish */}
    <Route path="/learn-turkish" element={<LearnTurkish />} />
    <Route path="/turkish/alphabets" element={<TurkishAlphabets />} />
    <Route path="/turkish/numbers" element={<NotFound />} />
    <Route path="/turkish/words" element={<NotFound />} />
    <Route path="/turkish/paragraph" element={<NotFound />} />
    
    {/* Vietnamese */}
    <Route path="/learn-vietnamese" element={<LearnVietnamese />} />
    <Route path="/vietnamese/alphabets" element={<VietnameseAlphabets />} />
    <Route path="/vietnamese/numbers" element={<NotFound />} />
    <Route path="/vietnamese/words" element={<NotFound />} />
    <Route path="/vietnamese/paragraph" element={<NotFound />} />
    
    {/* Thai */}
    <Route path="/learn-thai" element={<LearnThai />} />
    <Route path="/thai/alphabets" element={<ThaiAlphabets />} />
    <Route path="/thai/numbers" element={<NotFound />} />
    <Route path="/thai/words" element={<NotFound />} />
    <Route path="/thai/paragraph" element={<NotFound />} />
    
    {/* Polish */}
    <Route path="/learn-polish" element={<LearnPolish />} />
    <Route path="/polish/alphabets" element={<PolishAlphabets />} />
    <Route path="/polish/numbers" element={<NotFound />} />
    <Route path="/polish/words" element={<NotFound />} />
    <Route path="/polish/paragraph" element={<NotFound />} />
    
    {/* Dutch */}
    <Route path="/learn-dutch" element={<LearnDutch />} />
    <Route path="/dutch/alphabets" element={<DutchAlphabets />} />
    <Route path="/dutch/numbers" element={<NotFound />} />
    <Route path="/dutch/words" element={<NotFound />} />
    <Route path="/dutch/paragraph" element={<NotFound />} />
    
    {/* Swedish */}
    <Route path="/learn-swedish" element={<LearnSwedish />} />
    <Route path="/swedish/alphabets" element={<SwedishAlphabets />} />
    <Route path="/swedish/numbers" element={<NotFound />} />
    <Route path="/swedish/words" element={<NotFound />} />
    <Route path="/swedish/paragraph" element={<NotFound />} />
    
    {/* Telugu */}
    <Route path="/learn-telugu" element={<LearnTelugu />} />
    <Route path="/telugu/alphabets" element={<TeluguAlphabets />} />
    <Route path="/telugu/numbers" element={<NotFound />} />
    <Route path="/telugu/words" element={<NotFound />} />
    <Route path="/telugu/paragraph" element={<NotFound />} />
    
    {/* Urdu */}
    <Route path="/learn-urdu" element={<LearnUrdu />} />
    <Route path="/urdu/alphabets" element={<UrduAlphabets />} />
    <Route path="/urdu/numbers" element={<NotFound />} />
    <Route path="/urdu/words" element={<NotFound />} />
    <Route path="/urdu/paragraph" element={<NotFound />} />
    
    {/* Kannada */}
    <Route path="/learn-kannada" element={<LearnKannada />} />
    <Route path="/kannada/alphabets" element={<KannadaAlphabets />} />
    <Route path="/kannada/numbers" element={<NotFound />} />
    <Route path="/kannada/words" element={<NotFound />} />
    <Route path="/kannada/paragraph" element={<NotFound />} />
  </>
);
