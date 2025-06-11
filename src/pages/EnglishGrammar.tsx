
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getGrammarTranslations } from "@/utils/grammarTranslations";

const EnglishGrammar = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const { profile } = useAuth();

  const grammarTopics = [
    { 
      topic: "Present Simple", 
      example: "I <u>eat</u> breakfast every morning.", 
      explanation: "Used for habits and facts" 
    },
    { 
      topic: "Present Continuous", 
      example: "I <u>am eating</u> breakfast now.", 
      explanation: "Used for actions happening now" 
    },
    { 
      topic: "Past Simple", 
      example: "I <u>ate</u> breakfast yesterday.", 
      explanation: "Used for completed past actions" 
    },
    { 
      topic: "Past Continuous", 
      example: "I <u>was eating</u> when you called.", 
      explanation: "Used for ongoing past actions" 
    },
    { 
      topic: "Present Perfect", 
      example: "I <u>have eaten</u> breakfast.", 
      explanation: "Used for past actions with present relevance" 
    },
    { 
      topic: "Future Simple", 
      example: "I <u>will eat</u> breakfast tomorrow.", 
      explanation: "Used for future plans and predictions" 
    },
    { 
      topic: "Articles (a, an, the)", 
      example: "I saw <u>a</u> cat. <u>The</u> cat was black.", 
      explanation: "Used before nouns" 
    },
    { 
      topic: "Plural Nouns", 
      example: "One <u>book</u>, two <u>books</u>, three <u>children</u>.", 
      explanation: "Regular and irregular plurals" 
    },
    { 
      topic: "Possessive Forms", 
      example: "<u>John's</u> car, the <u>students'</u> books.", 
      explanation: "Shows ownership" 
    },
    { 
      topic: "Comparative Adjectives", 
      example: "<u>Bigger</u>, <u>better</u>, <u>more beautiful</u>.", 
      explanation: "Comparing two things" 
    },
    { 
      topic: "Superlative Adjectives", 
      example: "The <u>biggest</u>, the <u>best</u>, the <u>most beautiful</u>.", 
      explanation: "Comparing three or more things" 
    },
    { 
      topic: "Question Formation", 
      example: "<u>Do</u> you like coffee? <u>What time</u> is it?", 
      explanation: "Making questions with do/does/did and wh-words" 
    },
    { 
      topic: "Prepositions of Time", 
      example: "<u>At</u> 3 o'clock, <u>on</u> Monday, <u>in</u> January.", 
      explanation: "At, on, in for time expressions" 
    },
    { 
      topic: "Prepositions of Place", 
      example: "<u>At</u> home, <u>on</u> the table, <u>in</u> the box.", 
      explanation: "At, on, in for location" 
    },
    { 
      topic: "Modal Verbs", 
      example: "I <u>can</u> swim. You <u>should</u> study.", 
      explanation: "Can, could, should, would, must" 
    },
    { 
      topic: "Conditional Sentences", 
      example: "<u>If</u> it rains, I <u>will</u> stay home.", 
      explanation: "First, second, and third conditionals" 
    },
    { 
      topic: "Passive Voice", 
      example: "The book <u>was written</u> by Shakespeare.", 
      explanation: "Focus on the action, not the doer" 
    },
    { 
      topic: "Reported Speech", 
      example: "He <u>said that</u> he was tired.", 
      explanation: "Reporting what someone said" 
    },
    { 
      topic: "Gerunds and Infinitives", 
      example: "I enjoy <u>reading</u>. I want <u>to read</u>.", 
      explanation: "Verb forms used as nouns" 
    },
    { 
      topic: "Phrasal Verbs", 
      example: "<u>Turn on</u> the light. <u>Look after</u> the baby.", 
      explanation: "Verbs with particles that change meaning" 
    }
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for grammar topic: ${grammarTopics[index].topic}`);
    setTimeout(() => setPlayingAudio(null), 1000);
  };

  const preferredLanguage = profile?.preferred_language || 'English';
  const translations = getGrammarTranslations(preferredLanguage);

  const getTranslatedExplanation = (explanation: string) => {
    return translations[explanation] || explanation;
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            English Grammar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master English grammar with examples and explanations
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-8xl mx-auto">
          {grammarTopics.map((item, index) => (
            <div key={index} className="word-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="text-xl font-bold text-primary mb-2">{item.topic}</div>
                  <div 
                    className="text-lg font-medium mb-2 text-foreground" 
                    dangerouslySetInnerHTML={{ __html: item.example }}
                  />
                  <div className="text-sm text-muted-foreground">
                    {getTranslatedExplanation(item.explanation)}
                  </div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ml-4 ${playingAudio === index ? 'animate-pulse' : ''}`}
                  size="sm"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnglishGrammar;
