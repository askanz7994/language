

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
              text: `You are analyzing a Malayalam pronunciation recording. The user was supposed to read this EXACT Malayalam text:

"${originalText}"

Please listen to the audio recording and:

1. FIRST, determine if the speaker is attempting to read the provided Malayalam text or if they're saying something completely different
2. If they're reading unrelated content, clearly indicate this in your feedback
3. If they are attempting to read the correct text, provide detailed pronunciation analysis

IMPORTANT: Compare what was spoken against the EXACT original text provided above. If the recording contains different words, different content, or is in a different language, this should be reflected in a low accuracy score (1-3/10) and clear feedback about content mismatch.

Format your response as JSON with these exact fields:
- transcription: what you heard (in Malayalam script if possible, otherwise phonetic)
- accuracyScore: number from 1-10 (1-3 if content doesn't match original text, 4-6 if content matches but pronunciation needs work, 7-10 if content and pronunciation are good)
- feedback: detailed explanation focusing on content match and pronunciation quality
- improvements: specific areas to improve
- encouragement: positive encouragement

If the recording is completely unrelated to the original text, make this very clear in your feedback.`
            },
            {
              inline_data: {
                mime_type: "audio/webm",
                data: audioBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.3,
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
          transcription: "Unable to transcribe clearly",
          accuracyScore: 3,
          feedback: `Content analysis: ${responseText.substring(0, 300)}...`,
          improvements: "Please ensure you are reading the exact Malayalam text provided and speak clearly into the microphone",
          encouragement: "Keep practicing! Make sure to read the provided text exactly as written."
        };
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      analysisResult = {
        transcription: "Unable to transcribe clearly",
        accuracyScore: 3,
        feedback: `Content analysis indicates potential mismatch with original text. Response: ${responseText.substring(0, 200)}...`,
        improvements: "Please ensure you are reading the exact Malayalam text provided. Check that your microphone is working properly.",
        encouragement: "Don't worry! Make sure to read the provided Malayalam text exactly and try again."
      };
    }

    // Additional validation to ensure low scores for content mismatch
    if (analysisResult.feedback && 
        (analysisResult.feedback.toLowerCase().includes('unrelated') ||
         analysisResult.feedback.toLowerCase().includes('different') ||
         analysisResult.feedback.toLowerCase().includes('mismatch') ||
         analysisResult.feedback.toLowerCase().includes('wrong content'))) {
      analysisResult.accuracyScore = Math.min(analysisResult.accuracyScore, 3);
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pronunciation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      transcription: "Error occurred during analysis",
      accuracyScore: 1,
      feedback: "Unable to analyze pronunciation at this time. Please ensure you are reading the exact Malayalam text provided and try recording again.",
      improvements: "Check your microphone settings and ensure you're reading the provided Malayalam text exactly as written",
      encouragement: "Technical issues happen! Please try again and make sure to read the exact text provided."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

