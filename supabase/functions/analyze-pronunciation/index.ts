
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

    // Enhanced audio validation
    const audioSize = (audioBase64.length * 3) / 4;
    console.log('Audio size:', audioSize, 'bytes');

    // More sophisticated audio quality checks
    if (audioSize < 2048) {
      console.log('Audio too small, likely silent or poor quality');
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
    const languageInstruction = getLanguageInstruction(feedbackLanguage);

    // Enhanced prompt for more accurate analysis
    const analysisPrompt = `You are an EXPERT ${language} pronunciation analysis system with PhD-level expertise in phonetics and language learning. Your analysis must be EXTREMELY PRECISE and SCIENTIFICALLY ACCURATE.

ORIGINAL TEXT TO ANALYZE:
"${originalText}"

${languageInstruction}

CRITICAL ANALYSIS REQUIREMENTS:

1. TRANSCRIPTION ACCURACY:
   - Provide EXACT transcription of what was spoken
   - Mark unclear words with [unclear]
   - Note any background noise or audio issues
   - If completely silent, write "SILENT_AUDIO"

2. SCORING CRITERIA (1-10 scale):
   - 10: PERFECT pronunciation, timing, and clarity
   - 9: Near-perfect with 1 minor flaw
   - 8: Excellent with 2-3 minor issues
   - 7: Good with some noticeable errors
   - 6: Average with multiple errors
   - 5: Below average, needs improvement
   - 4: Poor with many errors
   - 3: Very poor, barely understandable
   - 2: Extremely poor, mostly unintelligible
   - 1: Silent, noise only, or completely wrong

3. DETAILED ANALYSIS REQUIREMENTS:
   - Compare EVERY word spoken vs original text
   - Identify missing words, extra words, wrong words
   - Analyze pronunciation accuracy of each syllable
   - Evaluate rhythm, stress, and intonation
   - Check for proper pauses and breathing
   - Assess overall fluency and naturalness

4. STRICT PENALTY SYSTEM:
   - Missing words: -2 points per word
   - Wrong words: -1.5 points per word
   - Extra words: -1 point per word
   - Poor pronunciation: -0.5 to -1 points per word
   - Unnatural rhythm: -1 point
   - Silent audio: automatic score of 1

5. AUDIO QUALITY VALIDATION:
   - If audio contains only silence, background noise, or non-speech: score = 1
   - If audio is too short (under 2 seconds for text longer than 5 words): max score = 3
   - If audio quality is poor but speech is detectable: max score = 6

Return ONLY valid JSON in ${feedbackLanguage}:
{
  "transcription": "exact_transcription_or_SILENT_AUDIO",
  "accuracyScore": number_1_to_10,
  "feedback": "detailed_scientific_analysis_in_${feedbackLanguage}",
  "improvements": "specific_actionable_corrections_in_${feedbackLanguage}",
  "encouragement": "motivating_educational_message_in_${feedbackLanguage}"
}`;

    // Call Gemini with enhanced configuration
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: analysisPrompt },
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
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          }
        ]
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
    
    let analysisResult;
    try {
      // Extract and parse JSON response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError, 'Response:', responseText);
      analysisResult = generateFallbackResponse(feedbackLanguage);
    }

    // Enhanced post-processing validation
    analysisResult = validateAndEnhanceResult(analysisResult, originalText, feedbackLanguage);

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

function validateAndEnhanceResult(result: any, originalText: string, language: string) {
  // Ensure score is within valid range
  if (result.accuracyScore < 1) result.accuracyScore = 1;
  if (result.accuracyScore > 10) result.accuracyScore = 10;

  // Enhanced silence detection
  const transcriptionLower = result.transcription?.toLowerCase() || '';
  const silenceIndicators = [
    'silent', 'silence', 'no speech', 'quiet', 'background noise',
    'silent_audio', 'no audio', 'empty', 'mute', 'nothing'
  ];
  
  if (silenceIndicators.some(indicator => transcriptionLower.includes(indicator))) {
    return generateSilentResponse(language);
  }

  // Word count validation
  const originalWords = originalText.trim().split(/\s+/).filter(word => word.length > 0);
  const transcribedWords = result.transcription?.trim().split(/\s+/).filter(word => word.length > 0) || [];
  
  console.log('Original words:', originalWords.length, 'Transcribed words:', transcribedWords.length);

  // Accuracy penalty based on word differences
  const wordDifference = Math.abs(originalWords.length - transcribedWords.length);
  if (wordDifference > originalWords.length * 0.3) {
    result.accuracyScore = Math.min(result.accuracyScore, 4);
  }

  // If transcription is too short compared to original
  if (transcribedWords.length < originalWords.length * 0.5) {
    result.accuracyScore = Math.min(result.accuracyScore, 3);
  }

  // Enhanced content matching
  const similarity = calculateTextSimilarity(originalText, result.transcription || '');
  if (similarity < 0.3) {
    result.accuracyScore = Math.min(result.accuracyScore, 4);
  } else if (similarity < 0.5) {
    result.accuracyScore = Math.min(result.accuracyScore, 6);
  }

  return result;
}

function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const words2 = text2.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  
  if (words1.length === 0 && words2.length === 0) return 1;
  if (words1.length === 0 || words2.length === 0) return 0;

  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
}

function getLanguageInstruction(language: string): string {
  const instructions: Record<string, string> = {
    'Malayalam': 'നിങ്ങൾ മലയാളത്തിൽ വിശദമായ ഫീഡ്ബാക്ക് നൽകണം. ഉച്ചാരണ വിശകലനം, മെച്ചപ്പെടുത്താനുള്ള മേഖലകൾ, പ്രോത്സാഹനം എന്നിവയെല്ലാം മലയാളത്തിൽ എഴുതുക.',
    'Spanish': 'Debes proporcionar comentarios detallados en español. Escribe el análisis de pronunciación, áreas de mejora y aliento en español.',
    'French': 'Vous devez fournir des commentaires détaillés en français. Rédigez l\'analyse de pronunciation, les domaines d\'amélioration et les encouragements en français.',
    'German': 'Sie müssen detailliertes Feedback auf Deutsch geben. Schreiben Sie die Ausspracheanalyse, Verbesserungsbereiche und Ermutigung auf Deutsch.',
    'Japanese': '日本語で詳細なフィードバックを提供してください。発音分析、改善点、励ましをすべて日本語で書いてください。',
    'Korean': '한국어로 상세한 피드백을 제공해야 합니다. 발음 분석, 개선할 점, 격려를 모두 한국어로 작성하세요.',
    'Portuguese (Brazil)': 'Você deve fornecer feedback detalhado em português brasileiro. Escreva a análise de pronúncia, áreas de melhoria e encorajamento em português.',
    'Portuguese (Portugal)': 'Deve fornecer feedback detalhado em português europeu. Escreva a análise de pronúncia, áreas de melhoria e encorajamento em português.',
    'Chinese (Simplified)': '您必须用简体中文提供详细反馈。请用中文写发音分析、改进领域和鼓励。',
    'Chinese (Traditional)': '您必須用繁體中文提供詳細反饋。請用中文寫發音分析、改進領域和鼓勵。',
    'Italian': 'Devi fornire feedback dettagliato in italiano. Scrivi l\'analisi della pronuncia, le aree di miglioramento e l\'incoraggiamento in italiano.',
    'Dutch': 'Je moet gedetailleerde feedback geven in het Nederlands. Schrijf de uitspraakanalyse, verbeterpunten en aanmoediging in het Nederlands.',
    'Russian': 'Вы должны предоставить подробную обратную связь на русском языке. Напишите анализ произношения, области для улучшения и поощрение на русском языке.',
    'Arabic': 'يجب عليك تقديم تعليقات مفصلة باللغة العربية. اكتب تحليل النطق ومجالات التحسين والتشجيع بالعربية.',
    'Hindi': 'आपको हिंदी में विस्तृत फीडबैक देना होगा। उच्चारण विश्लेषण, सुधार के क्षेत्र और प्रोत्साहन हिंदी में लिखें।'
  };

  return instructions[language] || 'You must provide detailed feedback in English. Write the pronunciation analysis, areas for improvement, and encouragement in English.';
}

function generateSilentResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "SILENT_AUDIO",
      accuracyScore: 1,
      feedback: "റെക്കോർഡിംഗിൽ വ്യക്തമായ സംസാരം കണ്ടെത്താനായില്ല. മൈക്രോഫോൺ പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കി നൽകിയിരിക്കുന്ന ടെക്സ്റ്റ് ഉറക്കെ വായിക്കുക.",
      improvements: "മൈക്രോഫോൺ അനുമതികളും വോളിയം ലെവലും പരിശോധിക്കുക. റെക്കോർഡിംഗ് സമയത്ത് വ്യക്തമായി സംസാരിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
      encouragement: "വിഷമിക്കേണ്ട! മൈക്രോഫോൺ ക്രമീകരണങ്ങൾ പരിശോധിച്ച് വീണ്ടും ശ്രമിക്കുക."
    },
    'Spanish': {
      transcription: "SILENT_AUDIO",
      accuracyScore: 1,
      feedback: "No se detectó habla clara en la grabación. Verifica que tu micrófono funcione y lee el texto en voz alta.",
      improvements: "Revisa los permisos del micrófono y el nivel de volumen. Asegúrate de hablar claramente durante la grabación.",
      encouragement: "¡No te preocupes! Verifica la configuración de tu micrófono e inténtalo de nuevo."
    }
  };

  return responses[language] || {
    transcription: "SILENT_AUDIO",
    accuracyScore: 1,
    feedback: "No clear speech detected in the recording. Please ensure your microphone is working and read the text aloud.",
    improvements: "Check microphone permissions and volume levels. Make sure to speak clearly during recording.",
    encouragement: "Don't worry! Check your microphone settings and try again."
  };
}

function generateFallbackResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "വിശകലനത്തിന് അപര്യാപ്തമായ ഓഡിയോ ഗുണനിലവാരം",
      accuracyScore: 2,
      feedback: "ഓഡിയോ ഗുണനിലവാരം മികച്ച വിശകലനത്തിന് അപര്യാപ്തമാണ്. വ്യക്തമായി സംസാരിച്ച് വീണ്ടും ശ്രമിക്കുക.",
      improvements: "മികച്ച ഓഡിയോ ഗുണനിലവാരത്തോടെ വീണ്ടും റെക്കോർഡ് ചെയ്യുക. സാവധാനത്തിലും വ്യക്തമായും സംസാരിക്കുക.",
      encouragement: "ഉപേക്ഷിക്കരുത്! വീണ്ടും ശ്രമിക്കുക, കൂടുതൽ വ്യക്തമായി സംസാരിക്കുക."
    }
  };

  return responses[language] || {
    transcription: "Audio quality insufficient for analysis",
    accuracyScore: 2,
    feedback: "Audio quality was insufficient for detailed analysis. Please try again speaking more clearly.",
    improvements: "Record again with better audio quality. Speak slowly and clearly.",
    encouragement: "Don't give up! Try again speaking more clearly."
  };
}

function generateErrorResponse(errorMessage: string) {
  return {
    error: errorMessage,
    transcription: "Analysis error occurred",
    accuracyScore: 1,
    feedback: "Technical error during pronunciation analysis. Please check your connection and try again.",
    improvements: "Ensure stable internet connection and proper microphone function. Try recording again.",
    encouragement: "Technical issues happen! Please try again."
  };
}
