
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { RealtimeChat } from '@/utils/RealtimeAudio';
import { Mic, MicOff, Loader2, Bot } from 'lucide-react';

interface TranscriptItem {
  speaker: 'user' | 'bot';
  text: string;
}

const VoiceInterface: React.FC = () => {
  const { toast } = useToast();
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const chatRef = useRef<RealtimeChat | null>(null);

  const handleMessage = (event: any) => {
    if (event.type === 'response.audio.started' || event.type === 'response.audio.delta') {
      setIsBotSpeaking(true);
    } else if (event.type === 'response.audio.done') {
      setIsBotSpeaking(false);
    } else if (event.type === 'conversation.item.done') {
        if(event.item.content[0].text.trim() === '') return;
        setTranscript(prev => [...prev, { speaker: 'bot', text: event.item.content[0].text }]);
    } else if (event.type === 'conversation.item.created' && event.item.role === 'user') {
        if(event.item.content[0].text.trim() === '') return;
        setTranscript(prev => [...prev, { speaker: 'user', text: event.item.content[0].text }]);
    }
  };

  const startConversation = async () => {
    setConnectionStatus('connecting');
    setTranscript([]);
    try {
      chatRef.current = new RealtimeChat(handleMessage);
      await chatRef.current.init();
      setConnectionStatus('connected');
      
      toast({
        title: "Conversation Started",
        description: "You can start speaking now.",
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      setConnectionStatus('error');
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : 'Failed to start conversation. Please check console for details.',
        variant: "destructive",
      });
    }
  };

  const endConversation = () => {
    chatRef.current?.disconnect();
    chatRef.current = null;
    setConnectionStatus('disconnected');
    setIsBotSpeaking(false);
    toast({
        title: "Conversation Ended",
    });
  };

  useEffect(() => {
    return () => {
      chatRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="language-card flex flex-col h-[60vh] max-h-[700px]">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {transcript.map((item, index) => (
          <div key={index} className={`flex items-start gap-3 ${item.speaker === 'user' ? 'justify-end' : ''}`}>
            {item.speaker === 'bot' && <div className="flex-shrink-0 size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center"><Bot size={20} /></div>}
            <div className={`rounded-lg px-4 py-2 max-w-sm ${item.speaker === 'user' ? 'bg-primary/10' : 'bg-muted'}`}>
              <p className="text-sm">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-shrink-0 p-4 border-t">
        <div className="flex items-center justify-center gap-4">
          {connectionStatus === 'connected' && isBotSpeaking && (
              <div className="flex items-center gap-2 text-primary">
                <Bot className="animate-pulse" />
                <span>AI is speaking...</span>
              </div>
          )}
          {connectionStatus === 'connected' && !isBotSpeaking && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mic />
                <span>Listening...</span>
              </div>
          )}

          {connectionStatus === 'disconnected' && <Button onClick={startConversation}><Mic className="mr-2"/>Start Conversation</Button>}
          {connectionStatus === 'connecting' && <Button disabled><Loader2 className="mr-2 animate-spin"/>Connecting...</Button>}
          {connectionStatus === 'connected' && <Button onClick={endConversation} variant="destructive"><MicOff className="mr-2"/>End Conversation</Button>}
          {connectionStatus === 'error' && <Button onClick={startConversation} variant="destructive"><Mic className="mr-2"/>Retry Connection</Button>}
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
