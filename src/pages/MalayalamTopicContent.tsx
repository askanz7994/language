
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import SpeechRecorder from "@/components/SpeechRecorder";
import { useToast } from "@/hooks/use-toast";
import VocabularySection from "@/components/malayalam/VocabularySection";
import TopicContentDisplay from "@/components/malayalam/TopicContentDisplay";
import { topicData } from "@/data/malayalamTopicData";

const MalayalamTopicContent = () => {
  const { topicId } = useParams();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const currentTopic = topicData[topicId || ""] || topicData["kerala-natural-beauty"];

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
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

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Start reading the Malayalam text aloud.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Please check your microphone permissions.",
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
        description: "Processing your pronunciation...",
      });
    }
  }, [isRecording, toast]);

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

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          <TopicContentDisplay
            title={currentTopic.title}
            malayalam={currentTopic.malayalam}
            english={currentTopic.english}
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
          />

          {/* Speech Recording Section */}
          <SpeechRecorder 
            originalText={currentTopic.malayalam}
            title={currentTopic.title}
            audioBlob={audioBlob}
          />

          {/* Vocabulary Section */}
          <VocabularySection vocabulary={currentTopic.vocabulary} />
        </div>
      </div>
    </div>
  );
};

export default MalayalamTopicContent;
