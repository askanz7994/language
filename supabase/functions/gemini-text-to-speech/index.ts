
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, language = 'en' } = await req.json();

    if (!text) {
      throw new Error('Text is required for speech synthesis');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Use Gemini to provide better pronunciation guidance for Malayalam
    const prompt = language === 'malayalam' 
      ? `Provide phonetic pronunciation guidance for this Malayalam text to help with text-to-speech accuracy. Break down complex words syllable by syllable: "${text}"`
      : `Provide natural pronunciation guidance for this text: "${text}"`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 500,
        }
      }),
    });

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const pronunciationGuidance = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    console.log('Gemini pronunciation guidance:', pronunciationGuidance);

    // Return the original text with pronunciation guidance
    // Note: Gemini doesn't directly support audio generation yet, 
    // but we can use the guidance to improve client-side TTS
    return new Response(JSON.stringify({ 
      success: true,
      text: text,
      pronunciationGuidance: pronunciationGuidance,
      language: language,
      message: 'Text processed with pronunciation guidance'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-text-to-speech function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
