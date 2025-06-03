import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import SpeechRecorder from "@/components/SpeechRecorder";

const MalayalamTopicContent = () => {
  const { topicId } = useParams();
  const [showTranslation, setShowTranslation] = useState(false);

  const topicData: { [key: string]: any } = {
    "kerala-natural-beauty": {
      title: "Kerala's Natural Beauty",
      malayalam: "കേരളം പ്രകൃതിരമണീയമായ ഭൂപ്രദേശമാണ്. പച്ചപ്പ് നിറഞ്ഞ പാടങ്ങളും തെങ്ങിൻതോപ്പുകളും കായലുകളും ഈ നാടിന് അതുല്യമായ സൗന്ദര്യം നൽകുന്നു. അറബിക്കടലിന്റെ തീരത്ത് സ്ഥിതി ചെയ്യുന്ന ഈ സംസ്ഥാനം ലോകമെമ്പാടുമുള്ള സഞ്ചാരികളെ ആകർഷിക്കുന്നു. ഇവിടുത്തെ കാലാവസ്ഥ മിതോഷ്ണവും മഴ സമൃദ്ധവുമാണ്. മൺസൂൺ കാലത്ത് കേരളം കൂടുതൽ മനോഹരമായി മാറുന്നു, പച്ചപ്പിന്റെ വസന്തം എങ്ങും നിറയുന്നു. ആയുർവേദ ചികിത്സയ്ക്കും യോഗയ്ക്കും പേരുകേട്ട ഇവിടം ആരോഗ്യ ടൂറിസത്തിന് അനുയോജ്യമായ സ്ഥലമാണ്. ദൈവത്തിന്റെ സ്വന്തം നാട് എന്നറിയപ്പെടുന്ന കേരളം അതിന്റെ പ്രകൃതിസൗന്ദര്യത്തിനും സാംസ്കാരിക പൈതൃകത്തിനും പേരുകേട്ടതാണ്.",
      english: "Kerala is a naturally beautiful region. Lush green fields, coconut groves, and backwaters give this land unique beauty. This state, situated on the Arabian Sea coast, attracts tourists from all over the world. The climate here is temperate, and rainfall is plentiful. Kerala becomes even more beautiful during the monsoon season, with a spring of greenery filling every corner. Known for Ayurvedic treatments and yoga, it's an ideal place for health tourism. Known as God's Own Country, Kerala is famous for its natural beauty and cultural heritage.",
      vocabulary: [
        { malayalam: "പ്രകൃതിരമണീയമായ", transliteration: "prakruthiramaniyaya", english: "naturally beautiful" },
        { malayalam: "ഭൂപ്രദേശം", transliteration: "bhoopradesham", english: "region/terrain" },
        { malayalam: "തെങ്ങിൻതോപ്പുകൾ", transliteration: "thenginthoppukal", english: "coconut groves" },
        { malayalam: "കായലുകൾ", transliteration: "kayalukal", english: "backwaters" },
        { malayalam: "അതുല്യമായ", transliteration: "athulyamaya", english: "unique" },
        { malayalam: "സൗന്ദര്യം", transliteration: "saundaryam", english: "beauty" },
        { malayalam: "അറബിക്കടൽ", transliteration: "arabikkadal", english: "Arabian Sea" },
        { malayalam: "സഞ്ചാരികൾ", transliteration: "sancharikal", english: "tourists" },
        { malayalam: "മിതോഷ്ണം", transliteration: "mithoshnam", english: "temperate" },
        { malayalam: "മൺസൂൺ", transliteration: "monsoon", english: "monsoon" }
      ]
    },
    "malayalam-language-literature": {
      title: "Malayalam Language and Literature",
      malayalam: "മലയാള ഭാഷയ്ക്കും സാഹിത്യത്തിനും വലിയ ചരിത്രമുണ്ട്. മലയാള സാഹിത്യത്തിലെ ത്രിമൂർത്തികളായ ഉള്ളൂർ, ആശാൻ, വള്ളത്തോൾ എന്നിവർ ഭാഷയെ സമ്പന്നമാക്കി. നോവലുകൾ, ചെറുകഥകൾ, കവിതകൾ, നാടകങ്ങൾ എന്നിങ്ങനെ വിവിധ സാഹിത്യ രൂപങ്ങൾ ഇവിടെ വികസിച്ചു. എം.ടി. വാസുദേവൻ നായർ, തകഴി ശിവശങ്കരപ്പിള്ള, ഒ.വി. വിജയൻ തുടങ്ങിയ പ്രമുഖ എഴുത്തുകാർ ലോക ശ്രദ്ധ നേടി. മലയാള സിനിമയും കലാരംഗവും സാംസ്കാരികമായി വളരെ പ്രാധാന്യമുള്ളതാണ്. ഓരോ തലമുറയും ഈ സാഹിത്യ പാരമ്പര്യം മുന്നോട്ട് കൊണ്ടുപോകുന്നു. മലയാളികൾക്ക് അവരുടെ ഭാഷയോടും സാഹിത്യത്തോടും വലിയ അഭിമാനമുണ്ട്.",
      english: "The Malayalam language and literature have a rich history. The triumvirate of Malayalam literature—Ulloor, Asan, and Vallathol—enriched the language. Various literary forms such as novels, short stories, poems, and plays developed here. Prominent writers like M.T. Vasudevan Nair, Thakazhi Sivasankara Pillai, and O.V. Vijayan gained global recognition. Malayalam cinema and the arts are also culturally very significant. Each generation carries this literary tradition forward. Malayalis have great pride in their language and literature.",
      vocabulary: [
        { malayalam: "സാഹിത്യം", transliteration: "sahithyam", english: "literature" },
        { malayalam: "ത്രിമൂർത്തികൾ", transliteration: "thrimoorthikal", english: "triumvirate" },
        { malayalam: "സമ്പന്നമാക്കി", transliteration: "sampannamakki", english: "enriched" },
        { malayalam: "നോവലുകൾ", transliteration: "novelukal", english: "novels" },
        { malayalam: "ചെറുകഥകൾ", transliteration: "cherukadhakal", english: "short stories" },
        { malayalam: "കവിതകൾ", transliteration: "kavithakal", english: "poems" },
        { malayalam: "നാടകങ്ങൾ", transliteration: "nadakangal", english: "plays" },
        { malayalam: "എഴുത്തുകാർ", transliteration: "ezhuthukar", english: "writers" },
        { malayalam: "തലമുറ", transliteration: "thalamura", english: "generation" },
        { malayalam: "അഭിമാനം", transliteration: "abhimanam", english: "pride" }
      ]
    },
    "festivals-of-kerala": {
      title: "Festivals of Kerala",
      malayalam: "കേരളത്തിലെ ഉത്സവങ്ങൾ വർണ്ണാഭമായതും വൈവിധ്യപൂർണ്ണവുമാണ്. ഓണം, വിഷു, തൃശ്ശൂർ പൂരം എന്നിവ പ്രധാന ആഘോഷങ്ങളാണ്. ഓണം ഒരു വിളവെടുപ്പ് ഉത്സവം ആണ്, അത് ഐശ്വര്യത്തിന്റെയും സമൃദ്ധിയുടെയും പ്രതീകമാണ്. വിഷു പുതുവർഷത്തെയും നല്ല ഭാവിയെയും സൂചിപ്പിക്കുന്നു. തൃശ്ശൂർ പൂരം ആനകളും വർണ്ണാഭമായ കുടമാറ്റവും മേളവുമായി നടത്തുന്ന ഒരു മഹോത്സവമാണ്. ഈ ഉത്സവങ്ങൾ കേരളത്തിന്റെ സംസ്കാരത്തെയും പാരമ്പര്യത്തെയും പ്രതിഫലിക്കുന്നു. മതപരമായ അതിരുകളില്ലാതെ എല്ലാവരും ഒരുമിച്ച് ആഘോഷിക്കുന്നു, ഇത് സാമൂഹിക ഐക്യത്തിന്റെയും സമാധാനത്തിന്റെയും പ്രതീകമാണ്.",
      english: "Festivals in Kerala are colorful and diverse. Onam, Vishu, and Thrissur Pooram are major celebrations. Onam is a harvest festival, symbolizing prosperity and abundance. Vishu signifies the New Year and a hopeful future. Thrissur Pooram is a grand festival celebrated with elephants, colorful parasol displays, and traditional music. These festivals reflect Kerala's culture and tradition. Everyone celebrates together, transcending religious boundaries, symbolizing social harmony and peace.",
      vocabulary: [
        { malayalam: "ഉത്സവങ്ങൾ", transliteration: "utsavangal", english: "festivals" },
        { malayalam: "വർണ്ണാഭമായ", transliteration: "varnabhamaya", english: "colorful" },
        { malayalam: "വൈവിധ്യപൂർണ്ണം", transliteration: "vaividhyapoornam", english: "diverse" },
        { malayalam: "വിളവെടുപ്പ്", transliteration: "vilaveduppu", english: "harvest" },
        { malayalam: "ഐശ്വര്യം", transliteration: "aishwaryam", english: "prosperity" },
        { malayalam: "സമൃദ്ധി", transliteration: "samruddhi", english: "abundance" },
        { malayalam: "പ്രതീകം", transliteration: "pratheekam", english: "symbol" },
        { malayalam: "കുടമാറ്റം", transliteration: "kudamattam", english: "parasol display" },
        { malayalam: "മഹോത്സവം", transliteration: "mahotsavam", english: "grand festival" },
        { malayalam: "പാരമ്പര്യം", transliteration: "paramparyam", english: "tradition" }
      ]
    },
    "ayurveda-healthcare": {
      title: "Ayurveda and Healthcare",
      malayalam: "കേരളത്തിന്റെ ആരോഗ്യമേഖലയും ആയുർവേദ ചികിത്സയും ലോകമെമ്പാടും പ്രശസ്തമാണ്. പ്രകൃതിദത്തമായ ഔഷധങ്ങളും ചികിത്സാരീതികളും ഇവിടെ ലഭ്യമാണ്. ശരീരത്തിനും മനസ്സിനും ഉന്മേഷം നൽകുന്ന ചികിത്സകളാണ് ആയുർവേദം നൽകുന്നത്. പഞ്ചകർമ്മ ചികിത്സകൾക്കും യുവജനങ്ങളെ ആകർഷിക്കുന്ന ആയുർവേദ റിസോർട്ടുകൾക്കും പേരുകേട്ടതാണ് കേരളം. പലരും ആരോഗ്യപരമായ പ്രശ്നങ്ങൾക്ക് പരിഹാരം തേടിയും മാനസികോല്ലാസത്തിനുവേണ്ടിയും കേരളത്തിൽ എത്തുന്നു. മസാജുകളും തെറാപ്പികളും വിനോദസഞ്ചാരികളെ ആകർഷിക്കുന്നു. ഇത് കേരളത്തിന്റെ ആരോഗ്യ ടൂറിസത്തിന് വലിയ സംഭാവന നൽകുന്നു.",
      english: "Kerala's healthcare sector and Ayurvedic treatment are famous worldwide. Natural medicines and treatment methods are available here. Ayurveda provides treatments that rejuvenate the body and mind. Kerala is known for Panchakarma treatments and Ayurvedic resorts that attract young people. Many people come to Kerala seeking solutions for health problems and for mental relaxation. Massages and therapies attract tourists. This contributes significantly to Kerala's health tourism.",
      vocabulary: [
        { malayalam: "ആരോഗ്യമേഖല", transliteration: "arogyamekhala", english: "healthcare sector" },
        { malayalam: "ചികിത്സ", transliteration: "chikitsa", english: "treatment" },
        { malayalam: "പ്രകൃതിദത്തം", transliteration: "prakruthidattam", english: "natural" },
        { malayalam: "ഔഷധങ്ങൾ", transliteration: "aushadhangal", english: "medicines" },
        { malayalam: "ഉന്മേഷം", transliteration: "unmesham", english: "rejuvenation" },
        { malayalam: "പഞ്ചകർമ്മ", transliteration: "panchakarma", english: "panchakarma" },
        { malayalam: "മാനസികോല്ലാസം", transliteration: "manasikollasam", english: "mental relaxation" },
        { malayalam: "മസാജ്", transliteration: "massage", english: "massage" },
        { malayalam: "തെറാപ്പി", transliteration: "therapy", english: "therapy" },
        { malayalam: "സംഭാവന", transliteration: "sambhavana", english: "contribution" }
      ]
    },
    "kerala-cuisine": {
      title: "Kerala Cuisine",
      malayalam: "കേരളത്തിലെ ഭക്ഷണം വളരെ രുചികരവും വൈവിധ്യപൂർണ്ണവുമാണ്. തേങ്ങാപ്പാലും വിവിധതരം മസാലകളും ഇവിടുത്തെ വിഭവങ്ങൾക്ക് പ്രത്യേക രുചി നൽകുന്നു. പുട്ട്, അപ്പം, ദോശ, ഇടിയപ്പം, കറികൾ, സദ്യ എന്നിവ പ്രധാന വിഭവങ്ങളാണ്. പ്രത്യേകിച്ച്, സദ്യ എന്നത് വിവിധതരം കറികളും പായസവും ഉൾപ്പെടുന്ന ഒരു പരമ്പരാഗത വിരുന്നാണ്. സസ്യേതര വിഭവങ്ങളും ധാരാളമായി ലഭ്യമാണ്, പ്രത്യേകിച്ച് കടൽ ഭക്ഷണങ്ങൾ. ഓരോ പ്രദേശത്തിനും അതിൻ്റേതായ പാചകരീതികളും പ്രാദേശിക വിഭവങ്ങളുമുണ്ട്. ഭക്ഷണപ്രിയർക്ക് ഇത് ഒരു പറുദീസയാണ്.",
      english: "Food in Kerala is very delicious and diverse. Coconut milk and various spices give a special taste to the dishes here. Puttu, Appam, Dosa, Idiyappam, curries, and Sadhya are popular dishes. Especially, Sadhya is a traditional feast including various curries and payasam. Non-vegetarian dishes are also widely available, especially seafood. Each region has its own cooking styles and local dishes. It is a paradise for food lovers.",
      vocabulary: [
        { malayalam: "രുചികരം", transliteration: "ruchikaram", english: "delicious" },
        { malayalam: "തേങ്ങാപ്പാൽ", transliteration: "thengappal", english: "coconut milk" },
        { malayalam: "മസാലകൾ", transliteration: "masalakal", english: "spices" },
        { malayalam: "വിഭവങ്ങൾ", transliteration: "vibhavangal", english: "dishes" },
        { malayalam: "പുട്ട്", transliteration: "puttu", english: "puttu" },
        { malayalam: "അപ്പം", transliteration: "appam", english: "appam" },
        { malayalam: "സദ്യ", transliteration: "sadhya", english: "sadhya" },
        { malayalam: "പായസം", transliteration: "payasam", english: "payasam" },
        { malayalam: "പാചകരീതി", transliteration: "pachakareeti", english: "cooking method" },
        { malayalam: "പറുദീസ", transliteration: "parudisa", english: "paradise" }
      ]
    },
    "education-in-kerala": {
      title: "Education in Kerala",
      malayalam: "കേരളത്തിൻ്റെ വിദ്യാഭ്യാസ നിലവാരം ഇന്ത്യയിൽ ഏറ്റവും ഉയർന്നതാണ്. സാക്ഷരതാ നിരക്കിൽ ഇന്ത്യയിൽ മുന്നിട്ട് നിൽക്കുന്ന സംസ്ഥാനമാണിത്. എല്ലാ കുട്ടികൾക്കും നല്ല വിദ്യാഭ്യാസം ഉറപ്പാക്കാൻ സർക്കാർ വലിയ പ്രാധാന്യം നൽകുന്നു. സ്കൂളുകളും കോളേജുകളും യൂണിവേഴ്സിറ്റികളും ഉൾപ്പെടെയുള്ള മികച്ച വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ ഇവിടെയുണ്ട്. വിദ്യാഭ്യാസം സമൂഹത്തിൽ വലിയ മാറ്റങ്ങൾ കൊണ്ടുവന്നു, സ്ത്രീ ശാക്തീകരണത്തിന് വലിയ സംഭാവന നൽകി. ഇത് കേരളത്തിൻ്റെ സാമൂഹികവും സാമ്പത്തികവുമായ പുരോഗതിക്ക് വലിയ പങ്കുവഹിച്ചു. ഉന്നത വിദ്യാഭ്യാസത്തിന് മികച്ച അവസരങ്ങൾ ഇവിടെയുണ്ട്.",
      english: "Kerala's educational standards are among the highest in India. It is a leading state in India in terms of literacy rate. The government places great importance on ensuring good education for all children. There are excellent educational institutions here, including schools, colleges, and universities. Education has brought significant changes in society and greatly contributed to women's empowerment. This has played a major role in Kerala's social and economic progress. There are excellent opportunities for higher education here.",
      vocabulary: [
        { malayalam: "വിദ്യാഭ്യാസം", transliteration: "vidyabhyasam", english: "education" },
        { malayalam: "നിലവാരം", transliteration: "nilavaram", english: "standard" },
        { malayalam: "സാക്ഷരതാ നിരക്ക്", transliteration: "saksharatha nirakku", english: "literacy rate" },
        { malayalam: "ഉറപ്പാക്കാൻ", transliteration: "urappakkan", english: "to ensure" },
        { malayalam: "സ്ഥാപനങ്ങൾ", transliteration: "sthapanangal", english: "institutions" },
        { malayalam: "മാറ്റങ്ങൾ", transliteration: "mattangal", english: "changes" },
        { malayalam: "ശാക്തീകരണം", transliteration: "shaktheekaranam", english: "empowerment" },
        { malayalam: "സാമൂഹിക", transliteration: "samoohika", english: "social" },
        { malayalam: "സാമ്പത്തിക", transliteration: "sampattika", english: "economic" },
        { malayalam: "പുരോഗതി", transliteration: "purogathi", english: "progress" }
      ]
    },
    "climate-of-kerala": {
      title: "Climate of Kerala",
      malayalam: "കേരളത്തിലെ കാലാവസ്ഥ വൈവിധ്യപൂർണ്ണമാണ്. തീരദേശത്ത് ചൂടുള്ളതും ഈർപ്പമുള്ളതുമായ കാലാവസ്ഥയാണെങ്കിൽ, മലയോരത്ത് തണുപ്പാണ് അനുഭവപ്പെടുന്നത്. മൺസൂൺ കാലത്ത് (ജൂൺ മുതൽ സെപ്റ്റംബർ വരെ) മഴ സമൃദ്ധമായി ലഭിക്കുന്നു. വേനൽക്കാലത്ത് (മാർച്ച് മുതൽ മെയ് വരെ) ചൂട് കൂടുമെങ്കിലും, മൺസൂൺ അതിന് ആശ്വാസം നൽകുന്നു. ഈ കാലാവസ്ഥ കൃഷിക്കും പ്രകൃതിക്കും വളരെ അനുയോജ്യമാണ്. റബ്ബർ, തേയില, കാപ്പി, സുഗന്ധവ്യഞ്ജനങ്ങൾ എന്നിവ ഇവിടെ ധാരാളമായി കൃഷി ചെയ്യുന്നു. ഓരോ കാലാവസ്ഥയും കേരളത്തിന്റെ ഭംഗി വർദ്ധിപ്പിക്കുന്നു.",
      english: "The climate in Kerala is diverse. While the coastal areas experience hot and humid weather, the hilly regions are cool. During the monsoon season (June to September), there is abundant rainfall. Although the summer (March to May) brings increased heat, the monsoon provides relief. This climate is very suitable for agriculture and nature. Rubber, tea, coffee, and spices are cultivated here in large quantities. Each season enhances the beauty of Kerala.",
      vocabulary: [
        { malayalam: "കാലാവസ്ഥ", transliteration: "kalavastha", english: "climate" },
        { malayalam: "തീരദേശം", transliteration: "theeradesham", english: "coastal area" },
        { malayalam: "ഈർപ്പം", transliteration: "eerppam", english: "humidity" },
        { malayalam: "മലയോരം", transliteration: "malayoram", english: "hillside" },
        { malayalam: "സമൃദ്ധമായി", transliteration: "samruddhamayi", english: "abundantly" },
        { malayalam: "വേനൽക്കാലം", transliteration: "venalkalam", english: "summer" },
        { malayalam: "ആശ്വാസം", transliteration: "ashwasam", english: "relief" },
        { malayalam: "അനുയോജ്യം", transliteration: "anuyojyam", english: "suitable" },
        { malayalam: "സുഗന്ധവ്യഞ്ജനങ്ങൾ", transliteration: "sugandhaviyanjanangal", english: "spices" },
        { malayalam: "ഭംഗി", transliteration: "bhangi", english: "beauty" }
      ]
    },
    "kerala-backwaters": {
      title: "Kerala Backwaters",
      malayalam: "കേരളത്തിലെ കായലുകൾ ലോകപ്രശസ്തമാണ്. ആലപ്പുഴയിലെ ഹൗസ്ബോട്ടുകൾ ലോകമെമ്പാടും നിന്നുള്ള സഞ്ചാരികളെ ആകർഷിക്കുന്നു. ശാന്തമായ കായൽ ജലത്തിലൂടെയുള്ള യാത്ര വളരെ മനോഹരമായ അനുഭവമാണ്. ഈ കായലുകൾ മത്സ്യസമ്പത്തിന് പേരുകേട്ടതാണ്, പ്രാദേശിക ജീവിതരീതിക്ക് ഇത് അവിഭാജ്യ ഘടകമാണ്. കായൽ ടൂറിസം കേരളത്തിന്റെ വരുമാനത്തിന് വലിയ സംഭാവന നൽകുന്നു. പ്രകൃതി സൗന്ദര്യം ആസ്വദിക്കാനും ഗ്രാമീണ ജീവിതം അടുത്തറിയാനും നിരവധി ആളുകൾ ഇവിടെയെത്തുന്നു. കായലുകളിലെ വള്ളംകളി ഉൽസവങ്ങൾ കാണാൻ ആയിരക്കണക്കിന് ആളുകൾ എത്തുന്നു.",
      english: "The backwaters of Kerala are world-famous. The houseboats in Alappuzha attract tourists from all over the world. Traveling through the calm backwater is a very beautiful experience. These backwaters are famous for their fish wealth, and it is an integral part of the local way of life. Backwater tourism contributes significantly to Kerala's income. Many people come here to enjoy the natural beauty and experience rural life up close. Thousands of people come to witness the boat race festivals in the backwaters.",
      vocabulary: [
        { malayalam: "കായലുകൾ", transliteration: "kayalukal", english: "backwaters" },
        { malayalam: "ലോകപ്രശസ്തം", transliteration: "lokaprasiddham", english: "world-famous" },
        { malayalam: "ഹൗസ്ബോട്ട്", transliteration: "houseboat", english: "houseboat" },
        { malayalam: "ശാന്തമായ", transliteration: "shanthamaya", english: "calm" },
        { malayalam: "മനോഹരം", transliteration: "manoharam", english: "beautiful" },
        { malayalam: "മത്സ്യസമ്പത്ത്", transliteration: "matsyasampathu", english: "fish wealth" },
        { malayalam: "അവിഭാജ്യം", transliteration: "avibhajyam", english: "integral" },
        { malayalam: "വരുമാനം", transliteration: "varumanam", english: "income" },
        { malayalam: "ഗ്രാമീണം", transliteration: "grameenarn", english: "rural" },
        { malayalam: "വള്ളംകളി", transliteration: "vallamkali", english: "boat race" }
      ]
    },
    "art-forms-kerala": {
      title: "Art Forms of Kerala",
      malayalam: "കേരളത്തിലെ കലാരൂപങ്ങൾ വളരെ സമ്പന്നവും വൈവിധ്യപൂർണ്ണവുമാണ്. കഥകളി, മോഹിനിയാട്ടം, തെയ്യം, കൂടിയാട്ടം എന്നിവ പ്രധാന കലാരൂപങ്ങളാണ്. ഇവ ഓരോന്നും കഥകളും ചരിത്രവും പുരാണങ്ങളും പ്രതിഫലിപ്പിക്കുന്നു. ഈ കലാരൂപങ്ങൾക്ക് നൂറ്റാണ്ടുകളുടെ പഴക്കമുണ്ട്, ഇവയെല്ലാം പാരമ്പര്യമായി തലമുറകളിലേക്ക് കൈമാറ്റം ചെയ്യപ്പെടുന്നു. കലാകാരന്മാർ ഈ പാരമ്പര്യം നിലനിർത്താനും പുതിയ തലമുറയിലേക്ക് എത്തിക്കാനും പരിശ്രമിക്കുന്നു. കേരളത്തിന്റെ സംസ്കാരത്തിന് ഈ കലാരൂപങ്ങൾ വലിയ പ്രാധാന്യം നൽകുന്നു. ഇവയെല്ലാം കേരളത്തിന്റെ തനത് സംസ്കാരത്തെ ലോകത്തിനു മുന്നിൽ അവതരിപ്പിക്കുന്നു.",
      english: "The art forms of Kerala are very rich and diverse. Kathakali, Mohiniyattam, Theyyam, and Koodiyattam are major art forms. Each of these reflects stories, history, and mythology. These art forms are centuries old, and they are traditionally passed down through generations. Artists strive to preserve this tradition and pass it on to the new generation. These art forms give great importance to the culture of Kerala. All of them present Kerala's unique culture to the world.",
      vocabulary: [
        { malayalam: "കലാരൂപങ്ങൾ", transliteration: "kalaroopangal", english: "art forms" },
        { malayalam: "സമ്പന്നം", transliteration: "sampannam", english: "rich" },
        { malayalam: "കഥകളി", transliteration: "kathakali", english: "kathakali" },
        { malayalam: "മോഹിനിയാട്ടം", transliteration: "mohiniyattam", english: "mohiniyattam" },
        { malayalam: "തെയ്യം", transliteration: "theyyam", english: "theyyam" },
        { malayalam: "പുരാണങ്ങൾ", transliteration: "puranangal", english: "mythology" },
        { malayalam: "നൂറ്റാണ്ടുകൾ", transliteration: "noottanduka;", english: "centuries" },
        { malayalam: "കൈമാറ്റം", transliteration: "kaimattam", english: "transmission" },
        { malayalam: "നിലനിർത്താൻ", transliteration: "nilanirthan", english: "to preserve" },
        { malayalam: "തനത്", transliteration: "thanathu", english: "unique" }
      ]
    },
    "peace-and-harmony": {
      title: "Peace and Harmony",
      malayalam: "കേരളം ഒരു സുരക്ഷിതവും സമാധാനപരവുമായ സംസ്ഥാനമാണ്. ഇവിടെയുള്ള ജനങ്ങൾ സഹിഷ്ണുതയോടെയും പരസ്പര ബഹുമാനത്തോടെയും ജീവിക്കുന്നു. വിവിധ മതക്കാരും സമുദായക്കാരും സൗഹൃദത്തിലും സഹകരണത്തിലും കഴിയുന്നു. സ്ത്രീ സുരക്ഷയ്ക്ക് ഇവിടെ വലിയ പ്രാധാന്യം നൽകുന്നു, ഇത് സ്ത്രീകളെ കൂടുതൽ സുരക്ഷിതരാക്കുന്നു. സാമൂഹിക ഐക്യവും സമാധാനവുമാണ് കേരളത്തിന്റെ മുഖമുദ്ര. ഈ സമാധാനപരമായ അന്തരീക്ഷം വിനോദസഞ്ചാരികളെ കൂടുതൽ ആകർഷിക്കുന്നു. നിയമവാഴ്ചയും ക്രമസമാധാനവും ഇവിടെ ശക്തമാണ്, ഇത് ജനങ്ങൾക്ക് സുരക്ഷ ഉറപ്പാക്കുന്നു.",
      english: "Kerala is a safe and peaceful state. The people here live with tolerance and mutual respect. People of various religions and communities live in friendship and cooperation. Great importance is given to women's safety here, which makes women feel more secure. Social harmony and peace are the hallmarks of Kerala. This peaceful atmosphere attracts more tourists. The rule of law and order here are strong, ensuring security for the people.",
      vocabulary: [
        { malayalam: "സുരക്ഷിതം", transliteration: "surakshitam", english: "safe" },
        { malayalam: "സമാധാനപരം", transliteration: "samadhanaparam", english: "peaceful" },
        { malayalam: "സഹിഷ്ണുത", transliteration: "sahishnuta", english: "tolerance" },
        { malayalam: "ബഹുമാനം", transliteration: "bahumanam", english: "respect" },
        { malayalam: "സമുദായക്കാർ", transliteration: "samudayakkar", english: "community members" },
        { malayalam: "സൗഹൃദം", transliteration: "sauhrudam", english: "friendship" },
        { malayalam: "സഹകരണം", transliteration: "sahakaranam", english: "cooperation" },
        { malayalam: "മുഖമുദ്ര", transliteration: "mukhamudra", english: "hallmark" },
        { malayalam: "അന്തരീക്ഷം", transliteration: "anthareeksham", english: "atmosphere" },
        { malayalam: "നിയമവാഴ്ച", transliteration: "niyamavazhcha", english: "rule of law" }
      ]
    }
  };

  const currentTopic = topicData[topicId || ""] || topicData["kerala-natural-beauty"];

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/malayalam/paragraph" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {currentTopic.title}
          </h1>
        </div>

        {/* Content Card */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Speech Recorder Component */}
          <SpeechRecorder 
            originalText={currentTopic.malayalam}
            title={currentTopic.title}
          />

          <Card className="language-card">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">{currentTopic.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Translation - moved to bottom */}
              <div className="mt-6 pt-4 border-t">
                <Button
                  onClick={toggleTranslation}
                  variant={showTranslation ? "default" : "outline"}
                  className="glow-button mb-4"
                >
                  {showTranslation ? "Hide" : "Show"} Translation
                </Button>
                
                {showTranslation && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">English Translation:</h4>
                    <div className="text-base leading-relaxed p-4 bg-muted/50 rounded-lg">
                      {currentTopic.english}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vocabulary Section */}
          <Card className="language-card">
            <CardHeader>
              <CardTitle className="text-xl">Vocabulary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {currentTopic.vocabulary.map((word: any, index: number) => (
                  <div key={index} className="word-card">
                    <div className="text-lg font-bold text-primary mb-1">{word.malayalam}</div>
                    <div className="text-sm text-muted-foreground mb-1">/{word.transliteration}/</div>
                    <div className="text-base">{word.english}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MalayalamTopicContent;
