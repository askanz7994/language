
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
      explanation: "Used for habits and facts",
      audioText: "I eat breakfast every morning"
    },
    { 
      topic: "Present Continuous", 
      example: "I <u>am eating</u> breakfast now.", 
      explanation: "Used for actions happening now",
      audioText: "I am eating breakfast now"
    },
    { 
      topic: "Past Simple", 
      example: "I <u>ate</u> breakfast yesterday.", 
      explanation: "Used for completed past actions",
      audioText: "I ate breakfast yesterday"
    },
    { 
      topic: "Past Continuous", 
      example: "I <u>was eating</u> when you called.", 
      explanation: "Used for ongoing past actions",
      audioText: "I was eating when you called"
    },
    { 
      topic: "Present Perfect", 
      example: "I <u>have eaten</u> breakfast.", 
      explanation: "Used for past actions with present relevance",
      audioText: "I have eaten breakfast"
    },
    { 
      topic: "Future Simple", 
      example: "I <u>will eat</u> breakfast tomorrow.", 
      explanation: "Used for future plans and predictions",
      audioText: "I will eat breakfast tomorrow"
    },
    { 
      topic: "Articles (a, an, the)", 
      example: "I saw <u>a</u> cat. <u>The</u> cat was black.", 
      explanation: "Used before nouns",
      audioText: "I saw a cat. The cat was black"
    },
    { 
      topic: "Plural Nouns", 
      example: "One <u>book</u>, two <u>books</u>, three <u>children</u>.", 
      explanation: "Regular and irregular plurals",
      audioText: "One book, two books, three children"
    },
    { 
      topic: "Possessive Forms", 
      example: "<u>John's</u> car, the <u>students'</u> books.", 
      explanation: "Shows ownership",
      audioText: "John's car, the students' books"
    },
    { 
      topic: "Comparative Adjectives", 
      example: "<u>Bigger</u>, <u>better</u>, <u>more beautiful</u>.", 
      explanation: "Comparing two things",
      audioText: "Bigger, better, more beautiful"
    },
    { 
      topic: "Superlative Adjectives", 
      example: "The <u>biggest</u>, the <u>best</u>, the <u>most beautiful</u>.", 
      explanation: "Comparing three or more things",
      audioText: "The biggest, the best, the most beautiful"
    },
    { 
      topic: "Question Formation", 
      example: "<u>Do</u> you like coffee? <u>What time</u> is it?", 
      explanation: "Making questions with do/does/did and wh-words",
      audioText: "Do you like coffee? What time is it?"
    },
    { 
      topic: "Prepositions of Time", 
      example: "<u>At</u> 3 o'clock, <u>on</u> Monday, <u>in</u> January.", 
      explanation: "At, on, in for time expressions",
      audioText: "At 3 o'clock, on Monday, in January"
    },
    { 
      topic: "Prepositions of Place", 
      example: "<u>At</u> home, <u>on</u> the table, <u>in</u> the box.", 
      explanation: "At, on, in for location",
      audioText: "At home, on the table, in the box"
    },
    { 
      topic: "Modal Verbs", 
      example: "I <u>can</u> swim. You <u>should</u> study.", 
      explanation: "Can, could, should, would, must",
      audioText: "I can swim. You should study"
    },
    { 
      topic: "Conditional Sentences", 
      example: "<u>If</u> it rains, I <u>will</u> stay home.", 
      explanation: "First, second, and third conditionals",
      audioText: "If it rains, I will stay home"
    },
    { 
      topic: "Passive Voice", 
      example: "The book <u>was written</u> by Shakespeare.", 
      explanation: "Focus on the action, not the doer",
      audioText: "The book was written by Shakespeare"
    },
    { 
      topic: "Reported Speech", 
      example: "He <u>said that</u> he was tired.", 
      explanation: "Reporting what someone said",
      audioText: "He said that he was tired"
    },
    { 
      topic: "Gerunds and Infinitives", 
      example: "I enjoy <u>reading</u>. I want <u>to read</u>.", 
      explanation: "Verb forms used as nouns",
      audioText: "I enjoy reading. I want to read"
    },
    { 
      topic: "Phrasal Verbs", 
      example: "<u>Turn on</u> the light. <u>Look after</u> the baby.", 
      explanation: "Verbs with particles that change meaning",
      audioText: "Turn on the light. Look after the baby"
    }
  ];

  const playAudio = async (index: number) => {
    setPlayingAudio(index);
    
    try {
      // Stop any currently playing audio
      speechSynthesis.cancel();
      
      const text = grammarTopics[index].audioText;
      console.log(`Playing audio for: "${text}"`);
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Ultra-optimized settings for maximum clarity and word detection
      utterance.rate = 0.6; // Even slower for better word recognition
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US'; // Explicit language setting
      
      // Wait for voices to be loaded
      const loadVoices = () => {
        return new Promise<SpeechSynthesisVoice[]>((resolve) => {
          const voices = speechSynthesis.getVoices();
          if (voices.length > 0) {
            resolve(voices);
          } else {
            speechSynthesis.addEventListener('voiceschanged', () => {
              resolve(speechSynthesis.getVoices());
            }, { once: true });
          }
        });
      };

      const voices = await loadVoices();
      
      // Priority order for voice selection for best clarity
      const voicePriority = [
        'Google US English',
        'Microsoft Zira',
        'Microsoft David',
        'Alex',
        'Samantha',
        'Daniel'
      ];
      
      let selectedVoice = null;
      
      // First try to find exact matches from priority list
      for (const priorityVoice of voicePriority) {
        selectedVoice = voices.find(voice => 
          voice.name.includes(priorityVoice) && voice.lang.startsWith('en')
        );
        if (selectedVoice) break;
      }
      
      // If no priority voice found, get the best available English voice
      if (!selectedVoice) {
        const englishVoices = voices.filter(voice => 
          voice.lang.startsWith('en') && 
          (voice.localService || voice.name.includes('Google') || voice.name.includes('Microsoft'))
        );
        selectedVoice = englishVoices[0] || voices.find(voice => voice.lang.startsWith('en'));
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`Using optimized voice: ${selectedVoice.name} (${selectedVoice.lang})`);
      }
      
      utterance.onend = () => {
        setPlayingAudio(null);
        console.log('Audio playback completed');
      };
      
      utterance.onerror = (event) => {
        console.error('Audio playback error:', event.error);
        setPlayingAudio(null);
      };
      
      // Enhanced delay for better Android/mobile compatibility
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 150);
      
    } catch (error) {
      console.error('Error playing audio:', error);
      setPlayingAudio(null);
    }
  };

  const preferredLanguage = profile?.preferred_language || 'English';
  const translations = getGrammarTranslations(preferredLanguage);

  const getTranslatedExplanation = (explanation: string) => {
    const translation = translations[explanation];
    console.log(`Translating "${explanation}" to ${preferredLanguage}: ${translation || explanation}`);
    return translation || explanation;
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
                  disabled={playingAudio === index}
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
