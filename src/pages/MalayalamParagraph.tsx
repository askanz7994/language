
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const MalayalamParagraph = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<number | null>(null);

  const topics = [
    {
      title: "Beautiful Kerala",
      malayalam: "കേരളം ഒരു മനോഹരമായ സംസ്ഥാനമാണ്. ഇവിടെ പച്ചപ്പ് നിറഞ്ഞ മലകളും, വെള്ളി നിറത്തിലുള്ള കടലും, സ്വർണ്ണനിറത്തിലുള്ള കടൽത്തീരങ്ങളും കാണാം. മലയാളികൾ വളരെ സൗഹൃദപരമായ ആളുകളാണ്. അവർ അതിഥികളെ സ്വാഗതം ചെയ്യുന്നത് വളരെ ഊഷ്മളതയോടെയാണ്. കേരളത്തിലെ പ്രധാന ഉത്സവങ്ങൾ ഓണം, വിഷു, ക്രിസ്തുമസ്, ഈദ് എന്നിവയാണ്. ഇവിടുത്തെ പരമ്പരാഗത നൃത്തങ്ങളായ കഥകളിയും മോഹിനിയാട്ടവും ലോകപ്രസിദ്ധമാണ്. കേരളത്തിലെ ആയുർവേദ ചികിത്സകളും വളരെ പ്രശസ്തമാണ്. ഇവിടെ എല്ലാ മതങ്ങളുടെയും ആളുകൾ സമാധാനത്തോടെ ജീവിക്കുന്നു. കേരളത്തിന്റെ സാക്ഷരതാ നിരക്ക് വളരെ ഉയർന്നതാണ്. ഇവിടുത്തെ ഭക്ഷണവും വളരെ രുചികരമാണ്.",
      english: "Kerala is a beautiful state. Here you can see green-filled mountains, silver-colored seas, and golden beaches. Malayalis are very friendly people. They welcome guests with great warmth. The main festivals of Kerala are Onam, Vishu, Christmas, and Eid. The traditional dances here like Kathakali and Mohiniyattam are world-famous. Ayurvedic treatments in Kerala are also very famous. Here people of all religions live peacefully. Kerala's literacy rate is very high. The food here is also very delicious."
    },
    {
      title: "Indian Culture",
      malayalam: "ഇന്ത്യയുടെ സംസ്കാരം ലോകത്തിലെ ഏറ്റവും പഴയതും സമ്പന്നവുമായ സംസ്കാരങ്ങളിലൊന്നാണ്. ഇവിടെ വിവിധ ഭാഷകൾ, മതങ്ങൾ, പാരമ്പര്യങ്ങൾ എന്നിവ കാണാം. ഇന്ത്യയിൽ 22 ഔദ്യോഗിക ഭാഷകൾ ഉണ്ട്. വിവിധ സംസ്ഥാനങ്ങളിൽ വ്യത്യസ്ത സംസ്കാരങ്ങൾ കാണാം. ഇന്ത്യൻ ക്ലാസിക്കൽ നൃത്തങ്ങൾ വളരെ പ്രശസ്തമാണ്. ഭരതനാട്യം, കഥക്, ഒഡിസി, കുചിപുടി എന്നിവ പ്രധാന നൃത്തരൂപങ്ങളാണ്. ഇന്ത്യൻ സിനിമയും സംഗീതവും ലോകമെമ്പാടും പ്രശസ്തമാണ്. യോഗയും ആയുർവേദവും ഇന്ത്യയുടെ അനമോൽ സംഭാവനകളാണ്. ഇന്ത്യയിലെ ഉത്സവങ്ങൾ വർണ്ണാഭമായവയാണ്. എല്ലാ മതങ്ങളും ഇവിടെ സമാധാനത്തോടെ നിലനിൽക്കുന്നു.",
      english: "India's culture is one of the oldest and richest cultures in the world. Here you can see various languages, religions, and traditions. India has 22 official languages. Different states have different cultures. Indian classical dances are very famous. Bharatanatyam, Kathak, Odissi, Kuchipudi are the main dance forms. Indian cinema and music are famous worldwide. Yoga and Ayurveda are India's invaluable contributions. Festivals in India are colorful. All religions coexist peacefully here."
    },
    {
      title: "Monsoon Season",
      malayalam: "മഴക്കാലം കേരളത്തിലെ ഏറ്റവും മനോഹരമായ സമയമാണ്. ജൂൺ മാസത്തിൽ തെക്കുപടിഞ്ഞാറൻ കാറ്റുകൾ കേരളത്തിൽ എത്തുന്നു. മഴയോടെ പ്രകൃതി പുതിയ ജീവൻ പ്രാപിക്കുന്നു. പുൽത്തകിടികൾ പച്ചപ്പിൽ മൂടപ്പെടുന്നു. നദികൾ കരകവിഞ്ഞൊഴുകുന്നു. കർഷകർക്ക് ഇത് ഏറ്റവും സന്തോഷകരമായ സമയമാണ്. നെൽകൃഷിക്ക് മഴവെള്ളം അത്യാവശ്യമാണ്. മഴക്കാലത്ത് കേരളത്തിലെ കാഴ്ചകൾ അതിമനോഹരമാണ്. മലകൾ മേഘങ്ങളാൽ മൂടപ്പെടുന്നു. വെള്ളച്ചാട്ടങ്ങൾ പൂർണ്ണവേഗത്തിൽ ഒഴുകുന്നു. മഴക്കാലത്ത് ആയുർവേദ ചികിത്സയ്ക്ക് ഏറ്റവും നല്ല സമയമാണ്. പക്ഷികളും മൃഗങ്ങളും സന്തോഷത്തോടെ ജീവിക്കുന്നു.",
      english: "Monsoon season is the most beautiful time in Kerala. In June, the southwest winds arrive in Kerala. With rain, nature gains new life. Grasslands are covered in green. Rivers overflow. This is the happiest time for farmers. Rainwater is essential for rice cultivation. The sights of Kerala during monsoon are extremely beautiful. Mountains are covered with clouds. Waterfalls flow at full speed. Monsoon is the best time for Ayurvedic treatment. Birds and animals live happily."
    },
    {
      title: "Traditional Food",
      malayalam: "കേരളത്തിലെ പരമ്പരാഗത ഭക്ഷണം വളരെ രുചികരവും പോഷകപ്രദവുമാണ്. അരിയാണ് പ്രധാന ഭക്ഷണം. കറിയും ചോറും ചേർന്നതാണ് സാധാരണ ഭക്ഷണം. നാളികേരം എല്ലാ വിഭവങ്ങളിലും ഉപയോഗിക്കുന്നു. മത്സ്യക്കറി, കോഴിക്കറി, ബീഫ് കറി എന്നിവ പ്രധാന വിഭവങ്ങളാണ്. പുത്തു, അപ്പം, ദോശ, ഇടിയപ്പം എന്നിവ പ്രാതൽ വിഭവങ്ങളാണ്. സദ്യ കേരളത്തിന്റെ പ്രത്യേകതയാണ്. വാഴയിലയിൽ വിളമ്പുന്ന സദ്യയിൽ ഒരുപാട് വിഭവങ്ങൾ ഉണ്ടാകും. പായസം, പ്രധമം എന്നിവ മധുരപലഹാരങ്ങളാണ്. ചായയും കാപ്പിയും ജനപ്രിയ പാനീയങ്ങളാണ്. മസാലകൾ കേരളത്തിന്റെ പ്രത്യേകതയാണ്.",
      english: "Traditional food of Kerala is very delicious and nutritious. Rice is the main food. Curry and rice together form the regular meal. Coconut is used in all dishes. Fish curry, chicken curry, beef curry are the main dishes. Puttu, appam, dosa, idiyappam are breakfast items. Sadhya is Kerala's specialty. Sadhya served on banana leaf has many dishes. Payasam and pradhanam are sweet dishes. Tea and coffee are popular beverages. Spices are Kerala's specialty."
    },
    {
      title: "Education System",
      malayalam: "കേരളത്തിലെ വിദ്യാഭ്യാസ സമ്പ്രദായം ഇന്ത്യയിലെ ഏറ്റവും മികച്ചതാണ്. സാക്ഷരതാ നിരക്ക് 100 ശതമാനത്തോട് അടുത്താണ്. സർക്കാർ സ്കൂളുകളും സ്വകാര്യ സ്കൂളുകളും ഇവിടെയുണ്ട്. പ്രാഥമിക വിദ്യാഭ്യാസം സൗജന്യമാണ്. പെൺകുട്ടികളുടെ വിദ്യാഭ്യാസത്തിന് പ്രത്യേക പരിഗണന നൽകുന്നു. കേരളത്തിൽ നിരവധി സർവ്വകലാശാലകളുണ്ട്. മെഡിക്കൽ, എഞ്ചിനീയറിംഗ് കോളേജുകൾ ഇവിടെയുണ്ട്. വിദൂര വിദ്യാഭ്യാസ സൗകര്യങ്ങളും ലഭ്യമാണ്. അധ്യാപകരുടെ നിലവാരം വളരെ ഉയർന്നതാണ്. കുട്ടികൾക്ക് സൗജന്യ പുസ്തകങ്ങളും യൂണിഫോമും നൽകുന്നു. വിദ്യാഭ്യാസത്തിൽ സാങ്കേതിക വിദ്യയും ഉപയോഗിക്കുന്നു.",
      english: "Kerala's education system is the best in India. Literacy rate is close to 100 percent. There are government schools and private schools here. Primary education is free. Special consideration is given to girls' education. Kerala has many universities. Medical and engineering colleges are here. Distance education facilities are also available. The quality of teachers is very high. Children are provided free books and uniforms. Technology is also used in education."
    },
    {
      title: "Festivals and Celebrations",
      malayalam: "കേരളത്തിലെ ഉത്സവങ്ങൾ വളരെ വർണ്ണാഭമായവയാണ്. ഓണം കേരളത്തിന്റെ ജാതീയ ഉത്സവമാണ്. രാജാവായ മഹാബലിയുടെ തിരിച്ചുവരവിനെ ആഘോഷിക്കുന്നതാണ് ഓണം. പൂക്കളം, ഓണസദ്യ, പുലികളി, ഓണപ്പാട്ട് എന്നിവ ഓണത്തിന്റെ പ്രത്യേകതകളാണ്. വിഷു കേരളത്തിന്റെ പുതുവർഷം ആഘോഷിക്കുന്ന ദിവസമാണ്. വിഷുക്കണി കാണുന്നത് ഈ ദിവസത്തെ പ്രധാന ആചാരമാണ്. തിരുവാതിര സ്ത്രീകളുടെ ഉത്സവമാണ്. നവരാത്രി, ദീപാവലി, ക്രിസ്തുമസ്, ഈദ് എന്നിവയും ആഘോഷിക്കുന്നു. ഓരോ ക്ഷേത്രത്തിലും വാർഷിക ഉത്സവങ്ങൾ നടക്കുന്നു. എല്ലാ മതങ്ങളുടെയും ഉത്സവങ്ങൾ എല്ലാവരും ആഘോഷിക്കുന്നു.",
      english: "Kerala's festivals are very colorful. Onam is Kerala's national festival. Onam celebrates the return of King Mahabali. Pookalam, Onasadhya, Pulikali, Onapattu are Onam's specialties. Vishu is the day Kerala celebrates its new year. Viewing Vishukkani is the main ritual of this day. Thiruvathira is women's festival. Navratri, Deepavali, Christmas, Eid are also celebrated. Annual festivals are held in every temple. Festivals of all religions are celebrated by everyone."
    },
    {
      title: "Art and Literature",
      malayalam: "കേരളത്തിലെ കലയും സാഹിത്യവും ലോകപ്രശസ്തമാണ്. കഥകളി കേരളത്തിന്റെ പ്രധാന നൃത്ത കലാരൂപമാണ്. കുടിയാട്ടം ലോകത്തിലെ ഏറ്റവും പഴയ നാടക രൂപമായി അംഗീകരിക്കപ്പെട്ടിരിക്കുന്നു. മോഹിനിയാട്ടം സ്ത്രീകളുടെ സോളോ നൃത്തമാണ്. തെയ്യം വടക്കൻ കേരളത്തിലെ പരമ്പരാഗത കലാരൂപമാണ്. മലയാള സാഹിത്യത്തിന് ദീർഘമായ ചരിത്രമുണ്ട്. ചേരമാൻ പെരുമാൾ മുതൽ ആധുനിക കവികൾ വരെ പല പ്രതിഭകൾ ഉണ്ടായിട്ടുണ്ട്. വള്ളത്തോൾ, കുമാരൻ ആശാൻ, ഉള്ളൂർ എന്നിവർ മഹാകവികളാണ്. മലയാള സിനിമയും ലോകപ്രശസ്തമാണ്. ചിത്രകലയും ശിൽപകലയും ഇവിടെ പ്രചുരമാണ്.",
      english: "Kerala's art and literature are world-famous. Kathakali is Kerala's main dance art form. Kudiyattam is recognized as the world's oldest theatrical form. Mohiniyattam is women's solo dance. Theyyam is traditional art form of northern Kerala. Malayalam literature has a long history. From Cheraman Perumal to modern poets, many talents have emerged. Vallathol, Kumaran Asan, Ulloor are great poets. Malayalam cinema is also world-famous. Painting and sculpture are abundant here."
    },
    {
      title: "Wildlife and Nature",
      malayalam: "കേരളത്തിലെ വന്യജീവികളും പ്രകൃതിയും അതിമനോഹരമാണ്. നിരവധി വന്യജീവി സങ്കേതങ്ങളും ദേശീയ ഉദ്യാനങ്ങളും ഇവിടെയുണ്ട്. പെരിയാർ, സൈലന്റ് വാലി, ഏരാവികുളം എന്നിവ പ്രധാന സങ്കേതങ്ങളാണ്. ആനകൾ, കടുവകൾ, പുലികൾ, കരടികൾ എന്നിവ ഇവിടെ കാണാം. നീലകുറിഞ്ഞി പൂവ് 12 വർഷത്തിലൊരിക്കൽ മാത്രം വിരിയുന്നു. മുന്നാർ, തേക്കടി, പൊൻമുടി എന്നിവ പ്രശസ്ത ഹിൽ സ്റ്റേഷനുകളാണ്. കേരളത്തിൽ 44 നദികളുണ്ട്. അഥിരപ്പള്ളി, വജ്രക്കല്ല് എന്നിവ പ്രശസ്ത വെള്ളച്ചാട്ടങ്ങളാണ്. ബാക്ക്വാട്ടറുകൾ കേരളത്തിന്റെ പ്രത്യേകതയാണ്. കുമരകോം, അല്ലേപ്പി എന്നിവ ബാക്ക്വാട്ടർ ടൂറിസത്തിന് പ്രശസ്തമാണ്.",
      english: "Kerala's wildlife and nature are extremely beautiful. There are many wildlife sanctuaries and national parks here. Periyar, Silent Valley, Eravikulam are major sanctuaries. Elephants, tigers, leopards, bears can be seen here. Neelakurinji flower blooms only once in 12 years. Munnar, Thekkady, Ponmudi are famous hill stations. Kerala has 44 rivers. Athirappilly, Vazhachal are famous waterfalls. Backwaters are Kerala's specialty. Kumarakom, Alleppey are famous for backwater tourism."
    },
    {
      title: "Traditional Medicine",
      malayalam: "ആയുർവേദം കേരളത്തിന്റെ പ്രധാന ചികിത്സാ സമ്പ്രദായമാണ്. ഇത് 5000 വർഷം പഴക്കമുള്ള ചികിത്സാ രീതിയാണ്. മൂലികകളും പ്രകൃതിദത്ത വസ്തുക്കളും ഉപയോഗിച്ചാണ് ചികിത്സ. പഞ്ചകർമ്മ ആയുർവേദത്തിലെ പ്രധാന ചികിത്സാ രീതിയാണ്. അഭ്യംഗം, ശിരോധാര, കിഴി എന്നിവ പ്രധാന ചികിത്സകളാണ്. വിദേശികൾ പോലും ആയുർവേദ ചികിത്സയ്ക്കായി കേരളത്തിൽ വരുന്നു. മഴക്കാലത്ത് ആയുർവേദ ചികിത്സയ്ക്ക് ഏറ്റവും നല്ല സമയമാണ്. ഇത് രോഗങ്ങളെ മാത്രമല്ല, അവയുടെ കാരണങ്ങളെയും ചികിത്സിക്കുന്നു. സുഷ്രുതൻ, ചരകൻ എന്നിവർ ആയുർവേദത്തിന്റെ പിതാക്കന്മാരാണ്. കേരളത്തിൽ ധാരാളം ആയുർവേദ ഹോസ്പിറ്റലുകളും കോളേജുകളുമുണ്ട്.",
      english: "Ayurveda is Kerala's main medical system. This is a 5000-year-old treatment method. Treatment uses herbs and natural substances. Panchakarma is the main treatment method in Ayurveda. Abhyangam, Shirodhara, Kizhi are main treatments. Even foreigners come to Kerala for Ayurvedic treatment. Monsoon season is the best time for Ayurvedic treatment. It treats not only diseases but also their causes. Susrutha, Charaka are fathers of Ayurveda. Kerala has many Ayurvedic hospitals and colleges."
    },
    {
      title: "Modern Kerala",
      malayalam: "ആധുനിക കേരളം വികസനത്തിന്റെ പുതിയ കഥ പറയുന്നു. ഇന്ന് കേരളം ഇന്ത്യയിലെ ഏറ്റവും വികസിത സംസ്ഥാനങ്ങളിലൊന്നാണ്. ഇൻഫർമേഷൻ ടെക്നോളജി മേഖലയിൽ കേരളം മുന്നേറുന്നു. തിരുവനന്തപുരം, കൊച്ചി എന്നിവ ഐടി ഹബ്ബുകളാണ്. ടൂറിസം കേരളത്തിന്റെ പ്രധാന വരുമാന മാർഗ്ഗമാണ്. എല്ലാ ജില്ലകളിലും വിമാനത്താവളങ്ങളുണ്ട്. കൊച്ചി മെട്രോ കേരളത്തിന്റെ അഭിമാനമാണ്. വിദേശത്ത് ജോലി ചെയ്യുന്ന മലയാളികൾ സംസ്ഥാനത്തിന്റെ വികസനത്തിന് വലിയ സംഭാവന നൽകുന്നു. കേരളത്തിലെ സ്ത്രീകൾ എല്ലാ മേഖലകളിലും മുന്നിൽ നിൽക്കുന്നു. പരിസ്ഥിതി സംരക്ഷണത്തിലും കേരളം മുൻപന്തിയിലാണ്.",
      english: "Modern Kerala tells a new story of development. Today Kerala is one of the most developed states in India. Kerala is advancing in the information technology sector. Thiruvananthapuram, Kochi are IT hubs. Tourism is Kerala's main source of income. Every district has airports. Kochi Metro is Kerala's pride. Malayalis working abroad contribute greatly to the state's development. Women in Kerala are leading in all sectors. Kerala is also at the forefront of environmental protection."
    }
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for topic: ${topics[index].title}`);
    setTimeout(() => setPlayingAudio(null), 3000);
  };

  const toggleTranslation = (index: number) => {
    setShowTranslation(showTranslation === index ? null : index);
  };

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link to="/learn-malayalam" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Malayalam
        </Link>

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Malayalam Topics
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore various topics through Malayalam paragraphs
          </p>
        </div>

        {/* Topic Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {topics.map((topic, index) => (
            <Card key={index} className="language-card">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">{topic.title}</CardTitle>
                <div className="flex gap-4 mb-4">
                  <Button
                    onClick={() => playAudio(index)}
                    className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''}`}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Read
                  </Button>
                  <Button
                    onClick={() => toggleTranslation(index)}
                    variant={showTranslation === index ? "default" : "outline"}
                    className="glow-button"
                  >
                    {showTranslation === index ? "Hide" : "Show"} Translation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Malayalam Text */}
                <div className="text-lg leading-relaxed mb-4 p-4 bg-muted rounded-lg">
                  {topic.malayalam}
                </div>
                
                {/* Translation */}
                {showTranslation === index && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">English Translation:</h4>
                    <div className="text-base leading-relaxed p-4 bg-muted/50 rounded-lg">
                      {topic.english}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MalayalamParagraph;
