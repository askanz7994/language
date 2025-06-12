
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";
import EnglishTranslationSection from "@/components/english/EnglishTranslationSection";

const EnglishWords = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);

  const words = [
    { english: "Hello", pronunciation: "/həˈloʊ/", meaning: "A greeting used when meeting someone" },
    { english: "Thank you", pronunciation: "/θæŋk juː/", meaning: "An expression of gratitude" },
    { english: "Please", pronunciation: "/pliːz/", meaning: "Used to make a polite request" },
    { english: "Yes", pronunciation: "/jɛs/", meaning: "Used to give a positive response" },
    { english: "No", pronunciation: "/noʊ/", meaning: "Used to give a negative response" },
    { english: "Water", pronunciation: "/ˈwɔːtər/", meaning: "A clear liquid essential for life" },
    { english: "Food", pronunciation: "/fuːd/", meaning: "Any substance consumed to provide nutrition" },
    { english: "House", pronunciation: "/haʊs/", meaning: "A building for human habitation" },
    { english: "School", pronunciation: "/skuːl/", meaning: "An institution for learning" },
    { english: "Book", pronunciation: "/bʊk/", meaning: "A written or printed work consisting of pages" },
    { english: "Time", pronunciation: "/taɪm/", meaning: "The indefinite continued progress of existence" },
    { english: "Day", pronunciation: "/deɪ/", meaning: "A period of 24 hours" },
    { english: "Night", pronunciation: "/naɪt/", meaning: "The period of darkness in each 24 hours" },
    { english: "Morning", pronunciation: "/ˈmɔːrnɪŋ/", meaning: "The period of time between midnight and noon" },
    { english: "Evening", pronunciation: "/ˈiːvnɪŋ/", meaning: "The period of time at the end of the day" },
    { english: "Week", pronunciation: "/wiːk/", meaning: "A period of seven days" },
    { english: "Month", pronunciation: "/mʌnθ/", meaning: "A period of time based on the moon's cycle" },
    { english: "Year", pronunciation: "/jɪr/", meaning: "A period of 365 or 366 days" },
    { english: "Today", pronunciation: "/təˈdeɪ/", meaning: "On this day" },
    { english: "Tomorrow", pronunciation: "/təˈmɔːroʊ/", meaning: "On the day after today" },
    { english: "Yesterday", pronunciation: "/ˈjɛstərdeɪ/", meaning: "On the day before today" },
    { english: "Mother", pronunciation: "/ˈmʌðər/", meaning: "A female parent" },
    { english: "Father", pronunciation: "/ˈfɑːðər/", meaning: "A male parent" },
    { english: "Child", pronunciation: "/tʃaɪld/", meaning: "A young human being" },
    { english: "Friend", pronunciation: "/frɛnd/", meaning: "A person you like and trust" },
    { english: "Family", pronunciation: "/ˈfæməli/", meaning: "A group of related people living together" },
    { english: "Love", pronunciation: "/lʌv/", meaning: "A strong feeling of affection" },
    { english: "Happy", pronunciation: "/ˈhæpi/", meaning: "Feeling pleasure or contentment" },
    { english: "Sad", pronunciation: "/sæd/", meaning: "Feeling sorrow or unhappiness" },
    { english: "Good", pronunciation: "/ɡʊd/", meaning: "Having positive qualities" },
    { english: "Bad", pronunciation: "/bæd/", meaning: "Having negative qualities" },
    { english: "Big", pronunciation: "/bɪɡ/", meaning: "Of considerable size or extent" },
    { english: "Small", pronunciation: "/smɔːl/", meaning: "Of limited size" },
    { english: "Hot", pronunciation: "/hɑːt/", meaning: "Having a high temperature" },
    { english: "Cold", pronunciation: "/koʊld/", meaning: "Having a low temperature" },
    { english: "Fast", pronunciation: "/fæst/", meaning: "Moving at high speed" },
    { english: "Slow", pronunciation: "/sloʊ/", meaning: "Moving at low speed" },
    { english: "Easy", pronunciation: "/ˈiːzi/", meaning: "Not difficult to do" },
    { english: "Hard", pronunciation: "/hɑːrd/", meaning: "Difficult to do or understand" },
    { english: "New", pronunciation: "/nuː/", meaning: "Recently created or discovered" },
    { english: "Old", pronunciation: "/oʊld/", meaning: "Having existed for a long time" },
    { english: "Car", pronunciation: "/kɑːr/", meaning: "A motor vehicle for transportation" },
    { english: "Bus", pronunciation: "/bʌs/", meaning: "A large vehicle for public transport" },
    { english: "Train", pronunciation: "/treɪn/", meaning: "A series of connected railway cars" },
    { english: "Plane", pronunciation: "/pleɪn/", meaning: "An aircraft for air travel" },
    { english: "Road", pronunciation: "/roʊd/", meaning: "A way for vehicles to travel" },
    { english: "Street", pronunciation: "/striːt/", meaning: "A public road in a city or town" },
    { english: "City", pronunciation: "/ˈsɪti/", meaning: "A large town" },
    { english: "Country", pronunciation: "/ˈkʌntri/", meaning: "A nation or rural area" },
    { english: "Money", pronunciation: "/ˈmʌni/", meaning: "Currency used for buying things" },
    { english: "Work", pronunciation: "/wɜːrk/", meaning: "Activity involving effort to achieve something" },
    { english: "Job", pronunciation: "/dʒɑːb/", meaning: "A paid position of employment" },
    { english: "Office", pronunciation: "/ˈɔːfɪs/", meaning: "A place where business is conducted" },
    { english: "Store", pronunciation: "/stɔːr/", meaning: "A place where goods are sold" },
    { english: "Market", pronunciation: "/ˈmɑːrkɪt/", meaning: "A place where goods are bought and sold" },
    { english: "Hospital", pronunciation: "/ˈhɑːspɪtl/", meaning: "A place for medical treatment" },
    { english: "Doctor", pronunciation: "/ˈdɑːktər/", meaning: "A medical professional" },
    { english: "Teacher", pronunciation: "/ˈtiːtʃər/", meaning: "A person who teaches" },
    { english: "Student", pronunciation: "/ˈstuːdənt/", meaning: "A person who studies" },
    { english: "Table", pronunciation: "/ˈteɪbl/", meaning: "A piece of furniture with a flat top" },
    { english: "Chair", pronunciation: "/tʃɛr/", meaning: "A seat for one person" },
    { english: "Bed", pronunciation: "/bɛd/", meaning: "A piece of furniture for sleeping" },
    { english: "Door", pronunciation: "/dɔːr/", meaning: "An entrance to a room or building" },
    { english: "Window", pronunciation: "/ˈwɪndoʊ/", meaning: "An opening in a wall to let in light" },
    { english: "Room", pronunciation: "/ruːm/", meaning: "A space within a building" },
    { english: "Kitchen", pronunciation: "/ˈkɪtʃən/", meaning: "A room for preparing food" },
    { english: "Bathroom", pronunciation: "/ˈbæθruːm/", meaning: "A room with a toilet and sink" }
  ];

  const playAudio = (index: number) => {
    setPlayingAudio(index);
    const word = words[index].english;
    console.log(`Playing audio for English word: ${word.toLowerCase()}`);
    
    // Use Speech Synthesis API to read the word aloud
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    
    utterance.onend = () => {
      setPlayingAudio(null);
    };
    
    speechSynthesis.speak(utterance);
    
    // Reset playing state after a short delay as fallback
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  return (
    <div className="min-h-screen animated-bg">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <Link to="/learn-english" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 md:mb-8 text-sm md:text-base">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to English
        </Link>

        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Essential English Words
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Build your vocabulary with common English words and their meanings
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto mb-8">
          {words.map((word, index) => (
            <div key={index} className="word-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="text-xl md:text-2xl font-bold text-primary mb-1">{word.english}</div>
                  <div className="text-sm text-muted-foreground italic mb-2">{word.pronunciation}</div>
                </div>
                <Button
                  onClick={() => playAudio(index)}
                  className={`audio-button ${playingAudio === index ? 'animate-pulse' : ''} flex-shrink-0 ml-2`}
                  size="sm"
                >
                  <Volume2 className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline ml-1">Listen</span>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground border-t border-border pt-3">
                <strong>Meaning:</strong><br />
                {word.meaning}
              </div>
            </div>
          ))}
        </div>

        <EnglishTranslationSection topicId="english-words" />
      </div>
    </div>
  );
};

export default EnglishWords;
