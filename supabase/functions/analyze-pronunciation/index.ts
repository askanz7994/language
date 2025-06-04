

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
              text: `You are a strict and accurate Malayalam pronunciation tutor. Your task is to analyze the audio recording and compare it EXACTLY to this original Malayalam text:

"${originalText}"

CRITICAL INSTRUCTIONS:
1. Listen carefully to what the speaker actually says
2. Compare WORD BY WORD against the original text
3. Be extremely strict - only give high scores (8-10) if the pronunciation is truly excellent
4. Give a score of 10 ONLY if the pronunciation is absolutely perfect with no errors
5. If the speaker adds extra words, skips words, or says different words, reduce the score significantly
6. If the speaker says something completely different, give score 1-2
7. Focus on both content accuracy AND pronunciation quality

SCORING GUIDELINES:
- 1-2: Completely wrong content or unintelligible
- 3-4: Some words correct but many errors or missing parts
- 5-6: Most content correct but noticeable pronunciation issues
- 7-8: Good content accuracy with minor pronunciation errors
- 9: Excellent with very minor imperfections
- 10: PERFECT - exact content with flawless pronunciation

Provide your analysis in JSON format with these exact fields:
{
  "transcription": "what you heard in Malayalam script",
  "accuracyScore": number from 1-10,
  "feedback": "detailed analysis comparing what was said vs original text",
  "improvements": "specific areas needing improvement",
  "encouragement": "motivating message based on performance level"
}`
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
          temperature: 0.1,
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
          transcription: "Unable to process audio clearly",
          accuracyScore: 2,
          feedback: "Audio quality insufficient for analysis. Please ensure you speak clearly and your microphone is working properly.",
          improvements: "Please record again with better audio quality. Speak slowly and clearly into the microphone.",
          encouragement: "Don't worry! Try recording again with clearer audio."
        };
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      analysisResult = {
        transcription: "Unable to process audio",
        accuracyScore: 1,
        feedback: "Could not analyze the audio recording. Please ensure you are reading the exact Malayalam text provided and that your microphone is working properly.",
        improvements: "Check your microphone settings and try recording again. Make sure to read only the provided Malayalam text.",
        encouragement: "Technical issues happen! Please try again and make sure to read the exact text provided."
      };
    }

    // Ensure accuracy score is within valid range
    if (analysisResult.accuracyScore < 1) analysisResult.accuracyScore = 1;
    if (analysisResult.accuracyScore > 10) analysisResult.accuracyScore = 10;

    // Additional validation for content analysis
    if (analysisResult.feedback && 
        (analysisResult.feedback.toLowerCase().includes('wrong') ||
         analysisResult.feedback.toLowerCase().includes('different') ||
         analysisResult.feedback.toLowerCase().includes('incorrect') ||
         analysisResult.feedback.toLowerCase().includes('missing') ||
         analysisResult.feedback.toLowerCase().includes('extra'))) {
      // Cap score at 4 if there are content issues
      analysisResult.accuracyScore = Math.min(analysisResult.accuracyScore, 4);
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
      feedback: "Unable to analyze pronunciation due to technical error. Please ensure you are reading the exact Malayalam text provided and try recording again.",
      improvements: "Check your microphone settings and ensure you're reading the provided Malayalam text exactly as written",
      encouragement: "Technical issues happen! Please try again and make sure to read the exact text provided."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

