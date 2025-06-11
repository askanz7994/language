
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getGrammarTranslations } from "@/utils/grammarTranslations";
import { grammarTopics } from "@/data/grammarTopicsData";
import { GrammarTopicCard } from "./GrammarTopicCard";

export const GrammarTopicsList = () => {
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const { profile } = useAuth();

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
    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 max-w-8xl mx-auto">
      {grammarTopics.map((topic, index) => (
        <GrammarTopicCard
          key={index}
          topic={topic}
          index={index}
          isPlaying={playingAudio === index}
          onPlayAudio={playAudio}
          translatedExplanation={getTranslatedExplanation(topic.explanation)}
        />
      ))}
    </div>
  );
};
