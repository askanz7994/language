
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
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const currentTopic = englishTopicData[topicId || ""] || englishTopicData["kerala-landscapes"];

  const startRecording = useCallback(async () => {
    try {
      // Enhanced audio constraints for better quality
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
          channelCount: 1,
          latency: 0.01,
          volume: 1.0
        } 
      });
      
      streamRef.current = stream;
      
      // Use better codec configuration
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/mp4;codecs=mp4a.40.2',
        'audio/ogg;codecs=opus',
        'audio/webm'
      ];
      
      let selectedMimeType = 'audio/webm';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }
      
      const mediaRecorder = new MediaRecorder(stream, { 
        mimeType: selectedMimeType,
        audioBitsPerSecond: 256000
      });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: selectedMimeType });
        console.log('Audio blob created:', audioBlob.size, 'bytes, type:', audioBlob.type);
        
        // Validate audio size
        if (audioBlob.size < 1024) {
          console.warn('Audio blob too small, likely empty recording');
          toast({
            title: "Recording too short",
            description: "Please speak longer and more clearly into the microphone.",
            variant: "destructive",
          });
          return;
        }
        
        setAudioBlob(audioBlob);
        
        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        toast({
          title: "Recording error",
          description: "There was an error with the recording. Please try again.",
          variant: "destructive",
        });
      };

      // Start recording with smaller time slices for better quality
      mediaRecorder.start(250);
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Read the English text clearly and at a natural pace. Speak close to your microphone.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Please check your microphone permissions and ensure it's working properly. Refresh the page if needed.",
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
        description: "Processing your pronunciation for detailed analysis...",
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
          <div className="language-card">
            <EnglishTopicContentDisplay
              title={currentTopic.title}
              english={currentTopic.english}
              isRecording={isRecording}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
            />
            
            <EnglishTranslationSection topicId={topicId || "kerala-landscapes"} />
          </div>

          <SpeechRecorder 
            originalText={currentTopic.english}
            title={currentTopic.title}
            audioBlob={audioBlob}
          />

          <EnglishVocabularySection vocabulary={currentTopic.vocabulary} />
        </div>
      </div>
    </div>
  );
};

export default EnglishTopicContent;
