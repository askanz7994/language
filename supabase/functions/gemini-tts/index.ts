
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
    const { text, language = 'ml-IN' } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    console.log('Generating TTS for text:', text.substring(0, 50) + '...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate audio pronunciation timing data for the following Malayalam text. For each word, provide the start time in milliseconds assuming a natural Malayalam speaking pace of about 2.5 words per second. Return only a JSON array with objects containing "word" and "startTime" properties.

Text: "${text}"

Expected format:
[
  {"word": "first_word", "startTime": 0},
  {"word": "second_word", "startTime": 400},
  ...
]`
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error('No timing data generated');
    }

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
    let timingData = [];
    
    if (jsonMatch) {
      try {
        timingData = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('Failed to parse timing data:', parseError);
        // Fallback to estimated timing
        const words = text.split(/\s+/);
        timingData = words.map((word: string, index: number) => ({
          word,
          startTime: index * 400 // 400ms per word (2.5 words/second)
        }));
      }
    } else {
      // Fallback timing
      const words = text.split(/\s+/);
      timingData = words.map((word: string, index: number) => ({
        word,
        startTime: index * 400
      }));
    }

    console.log('Generated timing data for', timingData.length, 'words');

    return new Response(JSON.stringify({ 
      success: true, 
      timingData,
      totalDuration: timingData.length * 400
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-tts function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
