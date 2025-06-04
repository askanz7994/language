
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
    const { audioBase64, originalText, language } = await req.json();

    if (!audioBase64 || !originalText) {
      throw new Error('Audio data and original text are required');
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Convert base64 audio to speech using Gemini
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `Please analyze this audio recording of someone reading Malayalam text and provide pronunciation feedback. 

Original Malayalam text: "${originalText}"

Please provide:
1. A transcription of what was spoken (if possible)
2. Pronunciation accuracy score (1-10)
3. Specific areas for improvement
4. Encouragement and positive feedback

Format your response as JSON with these fields:
- transcription: string
- accuracyScore: number (1-10)
- feedback: string
- improvements: string
- encouragement: string`
            },
            {
              inline_data: {
                mime_type: "audio/wav",
                data: audioBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response:', JSON.stringify(geminiData, null, 2));

    const responseText = geminiData.candidates[0]?.content?.parts[0]?.text || '';
    
    // Try to parse JSON from the response
    let analysisResult;
    try {
      // Extract JSON from the response if it's wrapped in other text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if JSON parsing fails
        analysisResult = {
          transcription: "Unable to transcribe",
          accuracyScore: 7,
          feedback: responseText.substring(0, 200) + "...",
          improvements: "Keep practicing with the pronunciation",
          encouragement: "Great effort! Keep practicing to improve your Malayalam pronunciation."
        };
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      analysisResult = {
        transcription: "Unable to transcribe",
        accuracyScore: 7,
        feedback: responseText.substring(0, 200) + "...",
        improvements: "Keep practicing with the pronunciation",
        encouragement: "Great effort! Keep practicing to improve your Malayalam pronunciation."
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pronunciation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      transcription: "Error occurred during analysis",
      accuracyScore: 5,
      feedback: "Unable to analyze pronunciation at this time. Please try again.",
      improvements: "Check your microphone and try recording again",
      encouragement: "Don't worry, keep practicing!"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
