
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { isValidAudioData, applyUltraStrictValidation } from './validation.ts';
import { generateSilentResponse, generateFallbackResponse, generateErrorResponse } from './responses.ts';
import { performGeminiAnalysis } from './gemini-analysis.ts';

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
    const { audioBase64, originalText, language, preferredLanguage } = await req.json();

    if (!audioBase64 || !originalText) {
      throw new Error('Audio data and original text are required');
    }

    // Enhanced audio validation with stricter criteria
    const audioSize = (audioBase64.length * 3) / 4;
    console.log('Audio size:', audioSize, 'bytes');

    // Calculate minimum expected audio size based on text length
    const wordCount = originalText.trim().split(/\s+/).length;
    const expectedMinDuration = wordCount * 0.3; // 0.3 seconds per word minimum
    const expectedMinSize = expectedMinDuration * 8000; // ~8KB per second for speech

    console.log(`Text has ${wordCount} words, expected min duration: ${expectedMinDuration}s, min size: ${expectedMinSize} bytes`);

    // Strict size validation
    if (audioSize < Math.max(expectedMinSize, 10240)) { // At least 10KB or calculated minimum
      console.log('Audio too small for meaningful speech analysis');
      const silentResponse = generateSilentResponse(preferredLanguage || 'English');
      return new Response(JSON.stringify(silentResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Advanced audio quality checks
    if (!isValidAudioData(audioBase64)) {
      console.log('Invalid or corrupted audio data detected');
      const silentResponse = generateSilentResponse(preferredLanguage || 'English');
      return new Response(JSON.stringify(silentResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    const feedbackLanguage = preferredLanguage || 'English';

    let analysisResult;
    try {
      analysisResult = await performGeminiAnalysis(audioBase64, originalText, feedbackLanguage, geminiApiKey);
    } catch (analysisError) {
      console.error('Gemini analysis error:', analysisError);
      analysisResult = generateFallbackResponse(feedbackLanguage);
    }

    // Ultra-strict post-processing validation
    analysisResult = applyUltraStrictValidation(analysisResult, originalText, feedbackLanguage, audioSize, expectedMinSize);

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-pronunciation function:', error);
    const errorResponse = generateErrorResponse(error.message);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
