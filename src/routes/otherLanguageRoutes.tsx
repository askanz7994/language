
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
import PortugueseNumbers from "@/pages/PortugueseNumbers";
import PortugueseWords from "@/pages/PortugueseWords";
import LearnRussian from "@/pages/LearnRussian";
import RussianAlphabets from "@/pages/RussianAlphabets";
import RussianNumbers from "@/pages/RussianNumbers";
import RussianWords from "@/pages/RussianWords";
import LearnArabic from "@/pages/LearnArabic";
import ArabicAlphabets from "@/pages/ArabicAlphabets";
import ArabicNumbers from "@/pages/ArabicNumbers";
import ArabicWords from "@/pages/ArabicWords";
import LearnIndonesian from "@/pages/LearnIndonesian";
import IndonesianAlphabets from "@/pages/IndonesianAlphabets";
import IndonesianNumbers from "@/pages/IndonesianNumbers";
import IndonesianWords from "@/pages/IndonesianWords";
import LearnItalian from "@/pages/LearnItalian";
import ItalianAlphabets from "@/pages/ItalianAlphabets";
import ItalianNumbers from "@/pages/ItalianNumbers";
import ItalianWords from "@/pages/ItalianWords";
import LearnTurkish from "@/pages/LearnTurkish";
import TurkishAlphabets from "@/pages/TurkishAlphabets";
import TurkishNumbers from "@/pages/TurkishNumbers";
import TurkishWords from "@/pages/TurkishWords";
import LearnVietnamese from "@/pages/LearnVietnamese";
import VietnameseAlphabets from "@/pages/VietnameseAlphabets";
import VietnameseNumbers from "@/pages/VietnameseNumbers";
import VietnameseWords from "@/pages/VietnameseWords";
import LearnThai from "@/pages/LearnThai";
import ThaiAlphabets from "@/pages/ThaiAlphabets";
import ThaiNumbers from "@/pages/ThaiNumbers";
import ThaiWords from "@/pages/ThaiWords";
import LearnPolish from "@/pages/LearnPolish";
import PolishAlphabets from "@/pages/PolishAlphabets";
import PolishNumbers from "@/pages/PolishNumbers";
import PolishWords from "@/pages/PolishWords";
import LearnDutch from "@/pages/LearnDutch";
import DutchAlphabets from "@/pages/DutchAlphabets";
import DutchNumbers from "@/pages/DutchNumbers";
import DutchWords from "@/pages/DutchWords";
import LearnSwedish from "@/pages/LearnSwedish";
import SwedishAlphabets from "@/pages/SwedishAlphabets";
import SwedishNumbers from "@/pages/SwedishNumbers";
import SwedishWords from "@/pages/SwedishWords";
import LearnTelugu from "@/pages/LearnTelugu";
import TeluguAlphabets from "@/pages/TeluguAlphabets";
import TeluguNumbers from "@/pages/TeluguNumbers";
import TeluguWords from "@/pages/TeluguWords";
import LearnUrdu from "@/pages/LearnUrdu";
import UrduAlphabets from "@/pages/UrduAlphabets";
import UrduNumbers from "@/pages/UrduNumbers";
import UrduWords from "@/pages/UrduWords";
import LearnKannada from "@/pages/LearnKannada";
import KannadaAlphabets from "@/pages/KannadaAlphabets";
import KannadaNumbers from "@/pages/KannadaNumbers";
import KannadaWords from "@/pages/KannadaWords";
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
    <Route path="/portuguese/numbers" element={<PortugueseNumbers />} />
    <Route path="/portuguese/words" element={<PortugueseWords />} />
    <Route path="/portuguese/paragraph" element={<NotFound />} />
    
    {/* Russian */}
    <Route path="/learn-russian" element={<LearnRussian />} />
    <Route path="/russian/alphabets" element={<RussianAlphabets />} />
    <Route path="/russian/numbers" element={<RussianNumbers />} />
    <Route path="/russian/words" element={<RussianWords />} />
    <Route path="/russian/paragraph" element={<NotFound />} />
    
    {/* Arabic */}
    <Route path="/learn-arabic" element={<LearnArabic />} />
    <Route path="/arabic/alphabets" element={<ArabicAlphabets />} />
    <Route path="/arabic/numbers" element={<ArabicNumbers />} />
    <Route path="/arabic/words" element={<ArabicWords />} />
    <Route path="/arabic/paragraph" element={<NotFound />} />
    
    {/* Indonesian */}
    <Route path="/learn-indonesian" element={<LearnIndonesian />} />
    <Route path="/indonesian/alphabets" element={<IndonesianAlphabets />} />
    <Route path="/indonesian/numbers" element={<IndonesianNumbers />} />
    <Route path="/indonesian/words" element={<IndonesianWords />} />
    <Route path="/indonesian/paragraph" element={<NotFound />} />
    
    {/* Italian */}
    <Route path="/learn-italian" element={<LearnItalian />} />
    <Route path="/italian/alphabets" element={<ItalianAlphabets />} />
    <Route path="/italian/numbers" element={<ItalianNumbers />} />
    <Route path="/italian/words" element={<ItalianWords />} />
    <Route path="/italian/paragraph" element={<NotFound />} />
    
    {/* Turkish */}
    <Route path="/learn-turkish" element={<LearnTurkish />} />
    <Route path="/turkish/alphabets" element={<TurkishAlphabets />} />
    <Route path="/turkish/numbers" element={<TurkishNumbers />} />
    <Route path="/turkish/words" element={<TurkishWords />} />
    <Route path="/turkish/paragraph" element={<NotFound />} />
    
    {/* Vietnamese */}
    <Route path="/learn-vietnamese" element={<LearnVietnamese />} />
    <Route path="/vietnamese/alphabets" element={<VietnameseAlphabets />} />
    <Route path="/vietnamese/numbers" element={<VietnameseNumbers />} />
    <Route path="/vietnamese/words" element={<VietnameseWords />} />
    <Route path="/vietnamese/paragraph" element={<NotFound />} />
    
    {/* Thai */}
    <Route path="/learn-thai" element={<LearnThai />} />
    <Route path="/thai/alphabets" element={<ThaiAlphabets />} />
    <Route path="/thai/numbers" element={<ThaiNumbers />} />
    <Route path="/thai/words" element={<ThaiWords />} />
    <Route path="/thai/paragraph" element={<NotFound />} />
    
    {/* Polish */}
    <Route path="/learn-polish" element={<LearnPolish />} />
    <Route path="/polish/alphabets" element={<PolishAlphabets />} />
    <Route path="/polish/numbers" element={<PolishNumbers />} />
    <Route path="/polish/words" element={<PolishWords />} />
    <Route path="/polish/paragraph" element={<NotFound />} />
    
    {/* Dutch */}
    <Route path="/learn-dutch" element={<LearnDutch />} />
    <Route path="/dutch/alphabets" element={<DutchAlphabets />} />
    <Route path="/dutch/numbers" element={<DutchNumbers />} />
    <Route path="/dutch/words" element={<DutchWords />} />
    <Route path="/dutch/paragraph" element={<NotFound />} />
    
    {/* Swedish */}
    <Route path="/learn-swedish" element={<LearnSwedish />} />
    <Route path="/swedish/alphabets" element={<SwedishAlphabets />} />
    <Route path="/swedish/numbers" element={<SwedishNumbers />} />
    <Route path="/swedish/words" element={<SwedishWords />} />
    <Route path="/swedish/paragraph" element={<NotFound />} />
    
    {/* Telugu */}
    <Route path="/learn-telugu" element={<LearnTelugu />} />
    <Route path="/telugu/alphabets" element={<TeluguAlphabets />} />
    <Route path="/telugu/numbers" element={<TeluguNumbers />} />
    <Route path="/telugu/words" element={<TeluguWords />} />
    <Route path="/telugu/paragraph" element={<NotFound />} />
    
    {/* Urdu */}
    <Route path="/learn-urdu" element={<LearnUrdu />} />
    <Route path="/urdu/alphabets" element={<UrduAlphabets />} />
    <Route path="/urdu/numbers" element={<UrduNumbers />} />
    <Route path="/urdu/words" element={<UrduWords />} />
    <Route path="/urdu/paragraph" element={<NotFound />} />
    
    {/* Kannada */}
    <Route path="/learn-kannada" element={<LearnKannada />} />
    <Route path="/kannada/alphabets" element={<KannadaAlphabets />} />
    <Route path="/kannada/numbers" element={<KannadaNumbers />} />
    <Route path="/kannada/words" element={<KannadaWords />} />
    <Route path="/kannada/paragraph" element={<NotFound />} />
  </>
);
