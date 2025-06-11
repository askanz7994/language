
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

    // Use Gemini 2.5 Flash for TTS generation
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
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
          temperature: 1.0,
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: "Iapetus"
              }
            }
          }
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini TTS response received');

    // Check if we have audio data in the response
    if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
      const audioData = data.candidates[0].content.parts[0].inlineData.data;
      const mimeType = data.candidates[0].content.parts[0].inlineData.mimeType;
      
      return new Response(JSON.stringify({ 
        success: true,
        audioData,
        mimeType,
        message: 'Audio generated successfully'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      // Fallback response if no audio data
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
