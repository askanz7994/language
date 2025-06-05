
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

    // Validate audio data - check if it's actually audio content
    const audioSize = (audioBase64.length * 3) / 4; // Approximate size in bytes
    console.log('Audio size:', audioSize, 'bytes');

    // If audio is too small (less than 1KB), it's likely silent or empty
    if (audioSize < 1024) {
      console.log('Audio too small, likely silent');
      return new Response(JSON.stringify({
        transcription: "No speech detected",
        accuracyScore: 1,
        feedback: "No speech was detected in the recording. Please ensure your microphone is working and speak clearly into it while reading the Malayalam text.",
        improvements: "Check your microphone permissions and settings. Make sure to actually read the provided text aloud during recording.",
        encouragement: "Don't worry! Make sure your microphone is unmuted and try speaking the Malayalam text clearly."
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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
              text: `You are an EXTREMELY STRICT Malayalam pronunciation tutor. Your job is to be very harsh and accurate in scoring. 

ORIGINAL TEXT TO COMPARE AGAINST:
"${originalText}"

CRITICAL SCORING RULES:
- Score 10 ONLY if pronunciation is ABSOLUTELY PERFECT with ZERO errors
- Score 9 for near-perfect with 1-2 very minor errors
- Score 7-8 for good pronunciation with some noticeable errors
- Score 5-6 for average pronunciation with multiple errors
- Score 3-4 for poor pronunciation with many errors
- Score 1-2 for very poor or mostly unintelligible speech
- Score 1 for silence, empty audio, background noise only, or non-speech sounds

STRICT REQUIREMENTS:
1. The speaker MUST say the EXACT words from the original text
2. If they say different words, wrong words, or skip words, score drops to 4 or below
3. If they add extra words not in the original, score drops significantly
4. If audio contains only silence, background noise, or non-speech sounds, give score 1
5. If audio is unclear, very short, or seems like testing sounds, give score 1-3
6. If speaker says something completely unrelated = score 1-2

AUDIO QUALITY CHECKS:
- If you detect only silence, background noise, or no clear speech, immediately give score 1
- If the audio seems to be just testing sounds or random noise, give score 1
- If you cannot make out any clear Malayalam words, give score 1-2

Be extremely critical. Most attempts should score between 3-7. Only give 8+ for truly excellent pronunciation.

Return ONLY valid JSON:
{
  "transcription": "what you actually heard in Malayalam (write 'Silent' if no speech detected)",
  "accuracyScore": number_1_to_10,
  "feedback": "detailed strict analysis of errors or silence detection",
  "improvements": "specific pronunciation corrections needed",
  "encouragement": "motivating but honest message"
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
        // Fallback for poor quality audio
        analysisResult = {
          transcription: "Audio quality too poor to analyze",
          accuracyScore: 1,
          feedback: "Audio is unclear, too short, or contains no recognizable Malayalam speech. Please ensure you speak clearly into the microphone and read the complete text provided.",
          improvements: "Record again with better audio quality. Speak slowly and clearly, ensuring you read the entire provided Malayalam text.",
          encouragement: "Don't give up! Make sure your microphone is working and try reading the text more slowly and clearly."
        };
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      analysisResult = {
        transcription: "Failed to process audio",
        accuracyScore: 1,
        feedback: "Unable to analyze the audio recording. This could be due to poor audio quality, background noise, or technical issues.",
        improvements: "Check your microphone settings, ensure there's no background noise, and try recording again while reading the provided Malayalam text clearly.",
        encouragement: "Technical issues happen! Please check your setup and try again."
      };
    }

    // Enforce strict scoring limits
    if (analysisResult.accuracyScore < 1) analysisResult.accuracyScore = 1;
    if (analysisResult.accuracyScore > 10) analysisResult.accuracyScore = 10;

    // Additional validation - check for silence indicators
    const transcriptionLower = analysisResult.transcription.toLowerCase();
    if (transcriptionLower.includes('silent') || transcriptionLower.includes('silence') || 
        transcriptionLower.includes('no speech') || transcriptionLower.includes('quiet') ||
        transcriptionLower.includes('background noise') || analysisResult.transcription.length < 5) {
      analysisResult.accuracyScore = 1;
      analysisResult.feedback = "No clear speech detected in the recording. Please ensure your microphone is working and speak the Malayalam text aloud.";
      analysisResult.transcription = "Silent or no speech detected";
    }

    // If transcription is very short or empty, cap score at 2
    if (!analysisResult.transcription || analysisResult.transcription.length < 10) {
      analysisResult.accuracyScore = Math.min(analysisResult.accuracyScore, 2);
      analysisResult.feedback = "Recording appears to be too short or unclear. " + analysisResult.feedback;
    }

    // If feedback indicates major content issues, cap score at 4
    const feedbackLower = analysisResult.feedback.toLowerCase();
    if (feedbackLower.includes('wrong') || feedbackLower.includes('different') || 
        feedbackLower.includes('incorrect') || feedbackLower.includes('missing') || 
        feedbackLower.includes('unrelated') || feedbackLower.includes('extra')) {
      analysisResult.accuracyScore = Math.min(analysisResult.accuracyScore, 4);
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pronunciation function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      transcription: "Error during analysis",
      accuracyScore: 1,
      feedback: "Technical error occurred during pronunciation analysis. Please check your internet connection and try again.",
      improvements: "Ensure your microphone is working and you have a stable internet connection. Try recording again.",
      encouragement: "Technical issues happen! Please try again."
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
