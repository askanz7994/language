
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
    const { audioBase64, originalText, language, preferredLanguage } = await req.json();

    if (!audioBase64 || !originalText) {
      throw new Error('Audio data and original text are required');
    }

    // Validate audio data - check if it's actually audio content
    const audioSize = (audioBase64.length * 3) / 4; // Approximate size in bytes
    console.log('Audio size:', audioSize, 'bytes');

    // If audio is too small (less than 1KB), it's likely silent or empty
    if (audioSize < 1024) {
      console.log('Audio too small, likely silent');
      const silentResponse = generateSilentResponse(preferredLanguage || 'English');
      return new Response(JSON.stringify(silentResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    // Get language instruction for feedback
    const feedbackLanguage = preferredLanguage || 'English';
    const languageInstruction = getLanguageInstruction(feedbackLanguage);

    // Convert base64 audio to speech using Gemini with enhanced prompt
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: `You are an EXPERT ${language} pronunciation tutor and language assessment specialist. Your job is to provide comprehensive, detailed analysis of English pronunciation with constructive feedback.

ORIGINAL TEXT TO COMPARE AGAINST:
"${originalText}"

${languageInstruction}

COMPREHENSIVE ANALYSIS REQUIREMENTS:

SCORING CRITERIA (1-10 scale):
- Score 10: Perfect native-level pronunciation, flawless articulation, natural rhythm and intonation
- Score 9: Excellent pronunciation with minor imperfections, very clear and natural
- Score 8: Very good pronunciation with occasional minor errors, highly intelligible
- Score 7: Good pronunciation with some noticeable errors but generally clear
- Score 6: Fair pronunciation with several errors but mostly understandable  
- Score 5: Average pronunciation with multiple errors affecting clarity
- Score 4: Below average with many errors, difficult to understand at times
- Score 3: Poor pronunciation with major errors, often hard to understand
- Score 2: Very poor pronunciation, mostly unintelligible
- Score 1: Silent, no speech detected, or completely unintelligible

DETAILED EVALUATION AREAS:
1. ACCURACY: Compare spoken words to original text
2. FLUENCY: Rhythm, pace, and natural flow
3. PRONUNCIATION: Individual sound accuracy
4. INTONATION: Stress patterns and melody
5. CLARITY: Overall intelligibility

STRICT REQUIREMENTS:
- The speaker MUST say the EXACT words from the original text
- Wrong words, missing words, or extra words significantly reduce the score
- If audio contains only silence, noise, or unrelated speech = score 1
- If words are unclear or mumbled = score reduced accordingly

Return ONLY valid JSON in ${feedbackLanguage}:
{
  "transcription": "exact words heard (write 'Silent' if no speech detected)",
  "accuracyScore": number_1_to_10,
  "feedback": "comprehensive analysis of pronunciation strengths and weaknesses in ${feedbackLanguage}",
  "improvements": "specific actionable tips for improvement in ${feedbackLanguage}",
  "encouragement": "motivating and supportive message in ${feedbackLanguage}",
  "detailedAnalysis": {
    "pronunciationErrors": ["specific sound or word errors"],
    "fluencyScore": number_1_to_10,
    "wordAccuracy": percentage_0_to_100,
    "speedAnalysis": "analysis of speaking pace and rhythm",
    "intonationTips": "specific advice for stress and melody patterns"
  }
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
          maxOutputTokens: 2000,
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
        analysisResult = generateFallbackResponse(feedbackLanguage);
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      analysisResult = generateFallbackResponse(feedbackLanguage);
    }

    // Enforce strict scoring and validation
    if (analysisResult.accuracyScore < 1) analysisResult.accuracyScore = 1;
    if (analysisResult.accuracyScore > 10) analysisResult.accuracyScore = 10;

    // Additional validation - check for silence indicators
    const transcriptionLower = (analysisResult.transcription || '').toLowerCase();
    if (transcriptionLower.includes('silent') || transcriptionLower.includes('silence') || 
        transcriptionLower.includes('no speech') || transcriptionLower.includes('quiet') ||
        transcriptionLower.includes('background noise') || analysisResult.transcription.length < 5) {
      analysisResult.accuracyScore = 1;
      analysisResult = generateSilentResponse(feedbackLanguage);
    }

    // Cap score for very short recordings
    if (!analysisResult.transcription || analysisResult.transcription.length < 10) {
      analysisResult.accuracyScore = Math.min(analysisResult.accuracyScore, 2);
      const shortAudioResponse = generateShortAudioResponse(feedbackLanguage);
      analysisResult.feedback = shortAudioResponse.feedback;
    }

    // Enhanced detailed analysis with defaults
    if (!analysisResult.detailedAnalysis) {
      analysisResult.detailedAnalysis = generateDetailedAnalysis(analysisResult.accuracyScore, feedbackLanguage);
    }

    // Ensure detailed analysis has all required fields
    analysisResult.detailedAnalysis = {
      pronunciationErrors: analysisResult.detailedAnalysis?.pronunciationErrors || [],
      fluencyScore: analysisResult.detailedAnalysis?.fluencyScore || Math.max(1, analysisResult.accuracyScore - 1),
      wordAccuracy: analysisResult.detailedAnalysis?.wordAccuracy || (analysisResult.accuracyScore * 10),
      speedAnalysis: analysisResult.detailedAnalysis?.speedAnalysis || getSpeedAnalysis(analysisResult.accuracyScore, feedbackLanguage),
      intonationTips: analysisResult.detailedAnalysis?.intonationTips || getIntonationTips(analysisResult.accuracyScore, feedbackLanguage)
    };

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

function getLanguageInstruction(language: string): string {
  const instructions: Record<string, string> = {
    'Malayalam': 'നിങ്ങൾ മലയാളത്തിൽ വിശദമായ ഫീഡ്ബാക്ക് നൽകണം.',
    'Spanish': 'Debes proporcionar comentarios detallados en español.',
    'French': 'Vous devez fournir des commentaires détaillés en français.',
    'German': 'Sie müssen detailliertes Feedback auf Deutsch geben.',
    'Japanese': '日本語で詳細なフィードバックを提供してください。',
    'Korean': '한국어로 상세한 피드백을 제공해야 합니다.',
    'Portuguese (Brazil)': 'Você deve fornecer feedback detalhado em português brasileiro.',
    'Chinese (Simplified)': '您必须用简体中文提供详细的反馈。',
    'Italian': 'Devi fornire feedback dettagliato in italiano.',
    'Dutch': 'Je moet gedetailleerde feedback geven in het Nederlands.',
    'Russian': 'Вы должны предоставить подробную обратную связь на русском языке.',
    'Arabic': 'يجب عليك تقديم تعليقات مفصلة باللغة العربية.',
    'Hindi': 'आपको हिंदी में विस्तृत फीडबैक देना होगा।'
  };

  return instructions[language] || 'You must provide detailed feedback in English.';
}

function generateDetailedAnalysis(score: number, language: string) {
  const analyses: Record<string, any> = {
    'Malayalam': {
      pronunciationErrors: score < 5 ? ["സ്വരങ്ങളുടെ ഉച്ചാരണം", "വ്യഞ്ജനങ്ങളുടെ വ്യക്തത"] : [],
      fluencyScore: Math.max(1, score - 1),
      wordAccuracy: score * 10,
      speedAnalysis: score < 5 ? "സാവധാനത്തിലും വ്യക്തമായും പറയാൻ ശ്രമിക്കുക" : "നല്ല വേഗത",
      intonationTips: "പ്രകൃതിദത്തമായ ഈണം ഉപയോഗിക്കുക"
    }
  };

  return analyses[language] || {
    pronunciationErrors: score < 5 ? ["vowel sounds", "consonant clarity", "word stress"] : [],
    fluencyScore: Math.max(1, score - 1),
    wordAccuracy: score * 10,
    speedAnalysis: score < 5 ? "Try speaking more slowly and clearly" : "Good pacing",
    intonationTips: "Focus on natural rhythm and stress patterns"
  };
}

function getSpeedAnalysis(score: number, language: string): string {
  if (score >= 8) return language === 'Malayalam' ? "വേഗത മികച്ചതാണ്" : "Excellent pacing";
  if (score >= 6) return language === 'Malayalam' ? "നല്ല വേഗത" : "Good speed";
  return language === 'Malayalam' ? "കൂടുതൽ സാവധാനത്തിൽ പറയുക" : "Speak more slowly";
}

function getIntonationTips(score: number, language: string): string {
  if (score >= 8) return language === 'Malayalam' ? "ഈണം വളരെ നല്ലതാണ്" : "Excellent intonation";
  if (score >= 6) return language === 'Malayalam' ? "ഈണം മെച്ചപ്പെടുത്താം" : "Work on stress patterns";
  return language === 'Malayalam' ? "വാക്കുകളുടെ ഊന്നൽ പരിശീലിക്കുക" : "Focus on word stress and rhythm";
}

function generateSilentResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "നിശബ്ദമായ ഓഡിയോ",
      accuracyScore: 1,
      feedback: "റെക്കോർഡിംഗിൽ വ്യക്തമായ സംസാരം കണ്ടെത്താനായില്ല. മൈക്രോഫോൺ പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കി ഇംഗ്ലീഷ് ടെക്സ്റ്റ് ഉറക്കെ വായിക്കുക.",
      improvements: "മൈക്രോഫോൺ അനുമതികളും ക്രമീകരണങ്ങളും പരിശോധിക്കുക. നൽകിയിരിക്കുന്ന ടെക്സ്റ്റ് വ്യക്തമായി വായിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
      encouragement: "വിഷമിക്കേണ്ട! മൈക്രോഫോൺ അൺമ്യൂട്ട് ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കി ഇംഗ്ലീഷ് ടെക്സ്റ്റ് വ്യക്തമായി സംസാരിക്കാൻ ശ്രമിക്കുക.",
      detailedAnalysis: {
        pronunciationErrors: ["വ്യക്തമായ സംസാരം കണ്ടെത്താനായില്ല"],
        fluencyScore: 1,
        wordAccuracy: 0,
        speedAnalysis: "ഓഡിയോ റെക്കോർഡ് ചെയ്യപ്പെട്ടില്ല",
        intonationTips: "മൈക്രോഫോൺ പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക"
      }
    }
  };

  return responses[language] || {
    transcription: "Silent",
    accuracyScore: 1,
    feedback: "No clear speech was detected in the recording. Please ensure your microphone is working and speak clearly into it while reading the English text.",
    improvements: "Check your microphone permissions and settings. Make sure to actually read the provided text aloud during recording. Position yourself closer to the microphone and speak in a quiet environment.",
    encouragement: "Don't worry! Technical issues happen. Make sure your microphone is unmuted and try speaking the English text clearly and at a normal pace.",
    detailedAnalysis: {
      pronunciationErrors: ["No speech detected"],
      fluencyScore: 1,
      wordAccuracy: 0,
      speedAnalysis: "No audio detected",
      intonationTips: "Ensure microphone is working properly"
    }
  };
}

function generateFallbackResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "ഓഡിയോ ഗുണനിലവാരം വിശകലനത്തിന് വേണ്ടത്ര മതിയായില്ല",
      accuracyScore: 2,
      feedback: "ഓഡിയോ അവ്യക്തമാണ്. മൈക്രോഫോണിലേക്ക് വ്യക്തമായി സംസാരിക്കുകയും നൽകിയിരിക്കുന്ന പൂർണ്ണമായ ഇംഗ്ലീഷ് ടെക്സ്റ്റ് വായിക്കുകയും ചെയ്യുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
      improvements: "മികച്ച ഓഡിയോ ഗുണനിലവാരത്തോടെ വീണ്ടും റെക്കോർഡ് ചെയ്യുക. സാവധാനത്തിലും വ്യക്തമായും സംസാരിക്കുക.",
      encouragement: "ഉപേക്ഷിക്കരുത്! കൂടുതൽ സാവധാനത്തിലും വ്യക്തമായും ശ്രമിക്കുക।"
    }
  };

  return responses[language] || {
    transcription: "Audio quality insufficient for analysis",
    accuracyScore: 2,
    feedback: "Audio is unclear or too short for proper analysis. Please ensure you speak clearly into the microphone and read the complete provided English text.",
    improvements: "Record again with better audio quality. Speak slowly and clearly, ensuring you read the entire provided English text. Use a quiet environment and position yourself close to the microphone.",
    encouragement: "Keep practicing! Try speaking more slowly and clearly. Make sure your microphone is working well and you're in a quiet space."
  };
}

function generateShortAudioResponse(language: string) {
  return {
    feedback: language === 'Malayalam' ? 
      "റെക്കോർഡിംഗ് വളരെ ചെറുതായിരിക്കുകയോ അവ്യക്തമായിരിക്കുകയോ ചെയ്യുന്നു. പൂർണ്ണമായ ടെക്സ്റ്റ് വായിക്കാൻ ശ്രമിക്കുക।" :
      "Recording appears to be too short or unclear. Please try to read the complete text provided."
  };
}

function generateErrorResponse(errorMessage: string) {
  return {
    error: errorMessage,
    transcription: "Error during analysis",
    accuracyScore: 1,
    feedback: "Technical error occurred during pronunciation analysis. Please check your internet connection and try again.",
    improvements: "Ensure your microphone is working and you have a stable internet connection. Try recording again with clear speech.",
    encouragement: "Technical issues happen! Please try again with a good internet connection.",
    detailedAnalysis: {
      pronunciationErrors: ["Technical error"],
      fluencyScore: 1,
      wordAccuracy: 0,
      speedAnalysis: "Unable to analyze due to technical error",
      intonationTips: "Please try again"
    }
  };
}
