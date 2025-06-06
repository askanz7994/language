import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import SpeechRecorder from "@/components/SpeechRecorder";
import { useToast } from "@/hooks/use-toast";
import EnglishVocabularySection from "@/components/english/EnglishVocabularySection";
import EnglishTopicContentDisplay from "@/components/english/EnglishTopicContentDisplay";
import EnglishTranslationSection from "@/components/english/EnglishTranslationSection";
import { englishTopicData } from "@/data/englishTopicData";

const EnglishTopicContent = () => {
  const { topicId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const currentTopic = englishTopicData[topicId || ""] || englishTopicData["kerala-landscapes"];

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100
        } 
      });
      
      const mediaRecorder = new MediaRecorder(stream, { 
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Read the English text clearly and at a natural pace.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Please check your microphone permissions and ensure it's working properly.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Processing your pronunciation for analysis...",
      });
    }
  }, [isRecording, toast]);

  return (
    <div className="min-h-screen blur-bg">
      <div className="container mx-auto px-4 py-16">
        <Link to="/english/paragraph" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Topics
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {currentTopic.title}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <EnglishTopicContentDisplay
            title={currentTopic.title}
            english={currentTopic.english}
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />

          <SpeechRecorder 
            originalText={currentTopic.english}
            title={currentTopic.title}
            audioBlob={audioBlob}
          />

          <EnglishTranslationSection topicId={topicId || "kerala-landscapes"} />

          <EnglishVocabularySection vocabulary={currentTopic.vocabulary} />
        </div>
      </div>
    </div>
  );
};

export default EnglishTopicContent;
