
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    if (!text) {
      throw new Error('Text is required');
    }

    console.log('Generating TTS for text:', text.substring(0, 50) + '...');

    // Use Gemini 2.0 Flash Thinking Experimental which supports audio
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: text
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Aoede"
              }
            }
          }
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      
      // If this model also fails, try without speech config
      const fallbackResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Please read this text aloud: ${text}`
            }]
          }],
          generationConfig: {
            temperature: 0.7
          }
        }),
      });

      if (!fallbackResponse.ok) {
        console.error('Fallback also failed, using Web Speech API');
        return new Response(JSON.stringify({ 
          success: false,
          message: 'Gemini TTS not available',
          fallbackToWebSpeech: true
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const data = await response.json();
    console.log('Gemini TTS response received');

    // Check if we have audio data in the response
    if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
      const audioData = data.candidates[0].content.parts[0].inlineData.data;
      const mimeType = data.candidates[0].content.parts[0].inlineData.mimeType;
      
      console.log('Audio data found, mime type:', mimeType);
      
      return new Response(JSON.stringify({ 
        success: true,
        audioData,
        mimeType,
        message: 'Audio generated successfully'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.log('No audio data in response, falling back to Web Speech API');
      return new Response(JSON.stringify({ 
        success: false,
        message: 'No audio data generated',
        fallbackToWebSpeech: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('Error in gemini-paragraph-tts function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false,
      fallbackToWebSpeech: true
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
