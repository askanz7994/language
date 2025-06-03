import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Square, Play, Loader2, Volume2, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SpeechRecorderProps {
  originalText: string;
  title: string;
}

interface AnalysisResult {
  transcription: string;
  accuracyScore: number;
  feedback: string;
  improvements: string;
  encouragement: string;
}

interface SavedRecording {
  id: string;
  title: string;
  text: string;
  audioBlob: Blob;
  timestamp: Date;
  analysisResult?: AnalysisResult;
}

const SpeechRecorder: React.FC<SpeechRecorderProps> = ({ originalText, title }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [savedRecordings, setSavedRecordings] = useState<SavedRecording[]>([]);
  const [liveCorrection, setLiveCorrection] = useState<string>('');
  const [recordingChunks, setRecordingChunks] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const liveCorrectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // Load saved recordings from localStorage on component mount
  React.useEffect(() => {
    const saved = localStorage.getItem('malayalam-recordings');
    if (saved) {
      try {
        const recordings = JSON.parse(saved);
        setSavedRecordings(recordings);
      } catch (error) {
        console.error('Error loading saved recordings:', error);
      }
    }
  }, []);

  const performLiveCorrection = useCallback(async (audioChunks: Blob[]) => {
    if (audioChunks.length === 0) return;

    try {
      // Create a temporary audio blob from current chunks
      const tempBlob = new Blob(audioChunks, { type: 'audio/webm' });
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('analyze-pronunciation', {
          body: {
            audioBase64: base64Audio,
            originalText: originalText,
            language: 'malayalam',
            isLiveCorrection: true
          }
        });

        if (!error && data) {
          setLiveCorrection(data.feedback || 'Keep going...');
        }
      };
      reader.readAsDataURL(tempBlob);
    } catch (error) {
      console.error('Live correction error:', error);
    }
  }, [originalText]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecordingChunks([]);
      setLiveCorrection('');

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          setRecordingChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
        
        // Clear live correction when recording stops
        setLiveCorrection('');
        if (liveCorrectionIntervalRef.current) {
          clearInterval(liveCorrectionIntervalRef.current);
          liveCorrectionIntervalRef.current = null;
        }
      };

      // Start recording with time slices for live analysis
      mediaRecorder.start(2000); // Collect data every 2 seconds
      setIsRecording(true);

      // Set up live correction interval
      liveCorrectionIntervalRef.current = setInterval(() => {
        if (recordingChunks.length > 0) {
          performLiveCorrection(recordingChunks);
        }
      }, 3000); // Analyze every 3 seconds
      
      toast({
        title: "Recording started",
        description: "Start reading the Malayalam text aloud. Live feedback will appear below.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording failed",
        description: "Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  }, [toast, recordingChunks, performLiveCorrection]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Clear live correction interval
      if (liveCorrectionIntervalRef.current) {
        clearInterval(liveCorrectionIntervalRef.current);
        liveCorrectionIntervalRef.current = null;
      }
      
      toast({
        title: "Recording stopped",
        description: "Processing your pronunciation...",
      });
    }
  }, [isRecording, toast]);

  const readText = useCallback(async () => {
    setIsReading(true);
    try {
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text: originalText,
          language: 'malayalam'
        }
      });

      if (error) {
        throw error;
      }

      // Simulate reading with speech synthesis as fallback
      const utterance = new SpeechSynthesisUtterance(originalText);
      utterance.lang = 'ml-IN'; // Malayalam language code
      utterance.rate = 0.8; // Slower rate for learning
      
      utterance.onend = () => {
        setIsReading(false);
      };

      utterance.onerror = () => {
        setIsReading(false);
        toast({
          title: "Reading failed",
          description: "Please try again.",
          variant: "destructive",
        });
      };

      speechSynthesis.speak(utterance);

      toast({
        title: "Reading text",
        description: "Listen carefully to the pronunciation.",
      });
    } catch (error) {
      console.error('Error reading text:', error);
      setIsReading(false);
      toast({
        title: "Reading failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [originalText, toast]);

  const analyzeAudio = useCallback(async () => {
    if (!audioBlob) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('analyze-pronunciation', {
          body: {
            audioBase64: base64Audio,
            originalText: originalText,
            language: 'malayalam'
          }
        });

        if (error) {
          throw error;
        }

        setAnalysisResult(data);
        toast({
          title: "Analysis complete",
          description: `Pronunciation score: ${data.accuracyScore}/10`,
        });
      };
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error analyzing audio:', error);
      toast({
        title: "Analysis failed",
        description: "Please try recording again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [audioBlob, originalText, toast]);

  const saveRecording = useCallback(() => {
    if (!audioBlob) return;

    const recording: SavedRecording = {
      id: Date.now().toString(),
      title: title,
      text: originalText,
      audioBlob: audioBlob,
      timestamp: new Date(),
      analysisResult: analysisResult || undefined
    };

    const updatedRecordings = [...savedRecordings, recording];
    setSavedRecordings(updatedRecordings);
    
    // Save to localStorage (note: Blob won't be serialized, but metadata will be saved)
    const recordingsToSave = updatedRecordings.map(({ audioBlob, ...rest }) => rest);
    localStorage.setItem('malayalam-recordings', JSON.stringify(recordingsToSave));

    toast({
      title: "Recording saved",
      description: "Your practice session has been saved locally.",
    });
  }, [audioBlob, title, originalText, analysisResult, savedRecordings, toast]);

  const playRecording = useCallback(() => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    }
  }, [audioBlob]);

  return (
    <Card className="language-card">
      <CardHeader>
        <CardTitle className="text-xl">Speech Practice - {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Reading Controls */}
        <div className="flex gap-4 justify-center mb-4">
          <Button
            onClick={readText}
            className="glow-button flex items-center gap-2"
            disabled={isReading || isRecording}
          >
            {isReading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Listening...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Listen Text
              </>
            )}
          </Button>
        </div>

        {/* Recording Controls */}
        <div className="flex gap-4 justify-center">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="glow-button flex items-center gap-2"
              disabled={isAnalyzing || isReading}
            >
              <Mic className="h-4 w-4" />
              Read Text
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop Recording
            </Button>
          )}
          
          {audioBlob && (
            <>
              <Button
                onClick={playRecording}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                Play Recording
              </Button>
              
              <Button
                onClick={saveRecording}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save
              </Button>
            </>
          )}
          
          {audioBlob && !isAnalyzing && (
            <Button
              onClick={analyzeAudio}
              className="glow-button flex items-center gap-2"
            >
              Analyze Pronunciation
            </Button>
          )}
          
          {isAnalyzing && (
            <Button disabled className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </Button>
          )}
        </div>

        {/* Live Correction Feedback */}
        {isRecording && liveCorrection && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Live Feedback:</h4>
            <p className="text-blue-700">{liveCorrection}</p>
          </div>
        )}

        {/* Saved Recordings Count */}
        {savedRecordings.length > 0 && (
          <div className="text-center text-sm text-muted-foreground">
            {savedRecordings.length} recording(s) saved locally
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {analysisResult.accuracyScore}/10
              </div>
              <div className="text-lg font-semibold">Pronunciation Score</div>
            </div>
            
            {analysisResult.transcription && (
              <div className="word-card">
                <h4 className="font-semibold mb-2">What we heard:</h4>
                <p className="text-muted-foreground">{analysisResult.transcription}</p>
              </div>
            )}
            
            <div className="word-card">
              <h4 className="font-semibold mb-2">Feedback:</h4>
              <p className="text-muted-foreground">{analysisResult.feedback}</p>
            </div>
            
            {analysisResult.improvements && (
              <div className="word-card">
                <h4 className="font-semibold mb-2">Areas for improvement:</h4>
                <p className="text-muted-foreground">{analysisResult.improvements}</p>
              </div>
            )}
            
            <div className="word-card bg-primary/10">
              <h4 className="font-semibold mb-2">Encouragement:</h4>
              <p className="text-primary">{analysisResult.encouragement}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpeechRecorder;
