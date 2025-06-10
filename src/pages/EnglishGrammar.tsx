
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { useState } from "react";

const EnglishGrammar = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const grammarTopics = [
    { topic: "Present Simple", example: "I eat breakfast every morning.", explanation: "Used for habits and facts" },
    { topic: "Present Continuous", example: "I am eating breakfast now.", explanation: "Used for actions happening now" },
    { topic: "Past Simple", example: "I ate breakfast yesterday.", explanation: "Used for completed past actions" },
    { topic: "Past Continuous", example: "I was eating when you called.", explanation: "Used for ongoing past actions" },
    { topic: "Present Perfect", example: "I have eaten breakfast.", explanation: "Used for past actions with present relevance" },
    { topic: "Future Simple", example: "I will eat breakfast tomorrow.", explanation: "Used for future plans and predictions" },
    { topic: "Articles (a, an, the)", example: "I saw a cat. The cat was black.", explanation: "Used before nouns" },
    { topic: "Plural Nouns", example: "One book, two books, three children.", explanation: "Regular and irregular plurals" },
    { topic: "Possessive Forms", example: "John's car, the students' books.", explanation: "Shows ownership" },
    { topic: "Comparative Adjectives", example: "Bigger, better, more beautiful.", explanation: "Comparing two things" },
    { topic: "Superlative Adjectives", example: "The biggest, the best, the most beautiful.", explanation: "Comparing three or more things" },
    { topic: "Question Formation", example: "Do you like coffee? What time is it?", explanation: "Making questions with do/does/did and wh-words" },
    { topic: "Prepositions of Time", example: "At 3 o'clock, on Monday, in January.", explanation: "At, on, in for time expressions" },
    { topic: "Prepositions of Place", example: "At home, on the table, in the box.", explanation: "At, on, in for location" },
    { topic: "Modal Verbs", example: "I can swim. You should study.", explanation: "Can, could, should, would, must" },
    { topic: "Conditional Sentences", example: "If it rains, I will stay home.", explanation: "First, second, and third conditionals" },
    { topic: "Passive Voice", example: "The book was written by Shakespeare.", explanation: "Focus on the action, not the doer" },
    { topic: "Reported Speech", example: "He said that he was tired.", explanation: "Reporting what someone said" },
    { topic: "Gerunds and Infinitives", example: "I enjoy reading. I want to read.", explanation: "Verb forms used as nouns" },
    { topic: "Phrasal Verbs", example: "Turn on the light. Look after the baby.", explanation: "Verbs with particles that change meaning" }
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    console.log(`Playing audio for grammar topic: ${grammarTopics[index].topic}`);
    setTimeout(() => setPlayingAudio(null), 1000);
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
                  <div className="text-lg font-medium mb-2 text-foreground">{item.example}</div>
                  <div className="text-sm text-muted-foreground">{item.explanation}</div>
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
