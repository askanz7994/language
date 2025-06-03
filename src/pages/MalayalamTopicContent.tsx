
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const MalayalamTopicContent = () => {
  const { topicId } = useParams();
  const [playingAudio, setPlayingAudio] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const topicData: { [key: string]: any } = {
    "beautiful-kerala": {
      title: "Beautiful Kerala",
      malayalam: "കേരളം ഒരു മനോഹരമായ സംസ്ഥാനമാണ്. ഇവിടെ പച്ചപ്പ് നിറഞ്ഞ മലകളും, വെള്ളി നിറത്തിലുള്ള കടലും, സ്വർണ്ണനിറത്തിലുള്ള കടൽത്തീരങ്ങളും കാണാം. മലയാളികൾ വളരെ സൗഹൃദപരമായ ആളുകളാണ്. അവർ അതിഥികളെ സ്വാഗതം ചെയ്യുന്നത് വളരെ ഊഷ്മളതയോടെയാണ്. കേരളത്തിലെ പ്രധാന ഉത്സവങ്ങൾ ഓണം, വിഷു, ക്രിസ്തുമസ്, ഈദ് എന്നിവയാണ്. ഇവിടുത്തെ പരമ്പരാഗത നൃത്തങ്ങളായ കഥകളിയും മോഹിനിയാട്ടവും ലോകപ്രസിദ്ധമാണ്. കേരളത്തിലെ ആയുർവേദ ചികിത്സകളും വളരെ പ്രശസ്തമാണ്. ഇവിടെ എല്ലാ മതങ്ങളുടെയും ആളുകൾ സമാധാനത്തോടെ ജീവിക്കുന്നു. കേരളത്തിന്റെ സാക്ഷരതാ നിരക്ക് വളരെ ഉയർന്നതാണ്. ഇവിടുത്തെ ഭക്ഷണവും വളരെ രുചികരമാണ്.",
      english: "Kerala is a beautiful state. Here you can see green-filled mountains, silver-colored seas, and golden beaches. Malayalis are very friendly people. They welcome guests with great warmth. The main festivals of Kerala are Onam, Vishu, Christmas, and Eid. The traditional dances here like Kathakali and Mohiniyattam are world-famous. Ayurvedic treatments in Kerala are also very famous. Here people of all religions live peacefully. Kerala's literacy rate is very high. The food here is also very delicious."
    },
    "indian-culture": {
      title: "Indian Culture",
      malayalam: "ഇന്ത്യയുടെ സംസ്കാരം ലോകത്തിലെ ഏറ്റവും പഴയതും സമ്പന്നവുമായ സംസ്കാരങ്ങളിലൊന്നാണ്. ഇവിടെ വിവിധ ഭാഷകൾ, മതങ്ങൾ, പാരമ്പര്യങ്ങൾ എന്നിവ കാണാം. ഇന്ത്യയിൽ 22 ഔദ്യോഗിക ഭാഷകൾ ഉണ്ട്. വിവിധ സംസ്ഥാനങ്ങളിൽ വ്യത്യസ്ത സംസ്കാരങ്ങൾ കാണാം. ഇന്ത്യൻ ക്ലാസിക്കൽ നൃത്തങ്ങൾ വളരെ പ്രശസ്തമാണ്. ഭരതനാട്യം, കഥക്, ഒഡിസി, കുചിപുടി എന്നിവ പ്രധാന നൃത്തരൂപങ്ങളാണ്. ഇന്ത്യൻ സിനിമയും സംഗീതവും ലോകമെമ്പാടും പ്രശസ്തമാണ്. യോഗയും ആയുർവേദവും ഇന്ത്യയുടെ അനമോൾ സംഭാവനകളാണ്. ഇന്ത്യയിലെ ഉത്സവങ്ങൾ വർണ്ണാഭമായവയാണ്. എല്ലാ മതങ്ങളും ഇവിടെ സമാധാനത്തോടെ നിലനിൽക്കുന്നു.",
      english: "India's culture is one of the oldest and richest cultures in the world. Here you can see various languages, religions, and traditions. India has 22 official languages. Different states have different cultures. Indian classical dances are very famous. Bharatanatyam, Kathak, Odissi, Kuchipudi are the main dance forms. Indian cinema and music are famous worldwide. Yoga and Ayurveda are India's invaluable contributions. Festivals in India are colorful. All religions coexist peacefully here."
    }
    // Add more topics as needed
  };

  const currentTopic = topicData[topicId || ""] || topicData["beautiful-kerala"];

  const playAudio = () => {
    setPlayingAudio(true);
    console.log(`Playing audio for topic: ${currentTopic.title}`);
    setTimeout(() => setPlayingAudio(false), 3000);
  };

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
        <div className="max-w-4xl mx-auto">
          <Card className="language-card">
            <CardHeader>
              <CardTitle className="text-2xl mb-4">{currentTopic.title}</CardTitle>
              <div className="flex gap-4 mb-4">
                <Button
                  onClick={playAudio}
                  className={`audio-button ${playingAudio ? 'animate-pulse' : ''}`}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Read
                </Button>
                <Button
                  onClick={toggleTranslation}
                  variant={showTranslation ? "default" : "outline"}
                  className="glow-button"
                >
                  {showTranslation ? "Hide" : "Show"} Translation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Malayalam Text */}
              <div className="text-lg leading-relaxed mb-4 p-4 bg-muted rounded-lg">
                {currentTopic.malayalam}
              </div>
              
              {/* Translation */}
              {showTranslation && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-2">English Translation:</h4>
                  <div className="text-base leading-relaxed p-4 bg-muted/50 rounded-lg">
                    {currentTopic.english}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MalayalamTopicContent;
