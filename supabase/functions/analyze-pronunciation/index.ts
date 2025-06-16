
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
    const languageInstruction = getLanguageInstruction(feedbackLanguage);

    // Ultra-strict analysis prompt with zero tolerance for gaming
    const analysisPrompt = `You are an ULTRA-STRICT pronunciation analysis expert with ZERO TOLERANCE for gaming or cheating. Your job is to provide RUTHLESSLY ACCURATE scoring.

ORIGINAL TEXT (USER MUST READ THIS EXACTLY):
"${originalText}"

${languageInstruction}

CRITICAL ANTI-CHEATING REQUIREMENTS:

1. SILENCE DETECTION (MANDATORY):
   - If audio contains ONLY silence, background noise, or non-speech sounds: SCORE = 1
   - If audio is shorter than expected for the text length: MAX SCORE = 2
   - If you hear breathing, clicking, or ambient noise without clear speech: SCORE = 1

2. TRANSCRIPTION ACCURACY (ZERO TOLERANCE):
   - EXACT transcription required - every word must match
   - Missing ANY word: -3 points immediately
   - Wrong ANY word: -2 points per word
   - Extra words not in original: -2 points per word
   - Unclear or mumbled words: -2 points per word

3. ULTRA-STRICT SCORING (1-10):
   - 10: PERFECT pronunciation, every word crystal clear, natural rhythm
   - 9: Near perfect, maybe 1 tiny pronunciation issue
   - 8: Very good, 1-2 minor errors
   - 7: Good, some noticeable errors but understandable
   - 6: Average, multiple errors affecting clarity
   - 5: Below average, many errors, difficult to understand
   - 4: Poor, very hard to understand, many wrong words
   - 3: Very poor, mostly unintelligible, wrong content
   - 2: Extremely poor, barely any correct speech detected
   - 1: Silent, noise only, completely wrong, or gaming attempt

4. MANDATORY PENALTIES:
   - Any silence or non-speech: AUTOMATIC SCORE = 1
   - Audio too short for text: MAX SCORE = 2
   - Background noise only: SCORE = 1
   - Incomplete reading: MAX SCORE = 3
   - Poor audio quality but some speech: MAX SCORE = 4

5. QUALITY VALIDATION:
   - Audio must contain clear human speech throughout
   - Speech must be audible and understandable
   - Must cover the complete original text
   - No shortcuts or gaming attempts allowed

RESPOND WITH VALID JSON ONLY in ${feedbackLanguage}:
{
  "transcription": "exact_words_heard_or_SILENT_AUDIO",
  "accuracyScore": score_1_to_10_following_strict_rules,
  "feedback": "detailed_analysis_explaining_score_in_${feedbackLanguage}",
  "improvements": "specific_areas_to_improve_in_${feedbackLanguage}",
  "encouragement": "motivating_message_in_${feedbackLanguage}"
}

BE ABSOLUTELY RUTHLESS. NO MERCY FOR GAMING ATTEMPTS.`;

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
          temperature: 0.05, // Very low temperature for consistent strict scoring
          maxOutputTokens: 2000,
          topP: 0.7,
          topK: 20
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

function isValidAudioData(audioBase64: string): boolean {
  try {
    // Check if base64 is valid
    if (audioBase64.length < 100) return false;
    
    // Basic validation of base64 encoding
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(audioBase64)) return false;
    
    // Check for common audio file signatures in base64
    const decoded = atob(audioBase64.substring(0, 100));
    const bytes = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      bytes[i] = decoded.charCodeAt(i);
    }
    
    // Check for WebM signature (0x1A 0x45 0xDF 0xA3)
    if (bytes.length >= 4) {
      if (bytes[0] === 0x1A && bytes[1] === 0x45 && bytes[2] === 0xDF && bytes[3] === 0xA3) {
        return true;
      }
    }
    
    // Allow other formats but be more strict
    return audioBase64.length > 1000; // Minimum reasonable size
  } catch (error) {
    console.error('Audio validation error:', error);
    return false;
  }
}

function applyUltraStrictValidation(result: any, originalText: string, language: string, audioSize: number, expectedMinSize: number) {
  // Ensure score is within valid range
  if (result.accuracyScore < 1) result.accuracyScore = 1;
  if (result.accuracyScore > 10) result.accuracyScore = 10;

  console.log('Applying ultra-strict validation...');
  console.log('Original accuracy score:', result.accuracyScore);

  // Enhanced silence detection
  const transcriptionLower = result.transcription?.toLowerCase() || '';
  const silenceIndicators = [
    'silent', 'silence', 'no speech', 'quiet', 'background noise',
    'silent_audio', 'no audio', 'empty', 'mute', 'nothing', 'unclear',
    'inaudible', 'whisper', 'breathing', 'ambient', 'noise only'
  ];
  
  if (silenceIndicators.some(indicator => transcriptionLower.includes(indicator)) || 
      transcriptionLower === 'silent_audio' || 
      transcriptionLower.length < 10) {
    console.log('Silence detected, forcing score to 1');
    return generateSilentResponse(language);
  }

  // Strict audio size validation
  if (audioSize < expectedMinSize) {
    console.log(`Audio too small: ${audioSize} < ${expectedMinSize}, max score 2`);
    result.accuracyScore = Math.min(result.accuracyScore, 2);
  }

  // Word count and content validation
  const originalWords = originalText.trim().split(/\s+/).filter(word => word.length > 0);
  const transcribedWords = result.transcription?.trim().split(/\s+/).filter(word => word.length > 0) || [];
  
  console.log(`Original words: ${originalWords.length}, Transcribed words: ${transcribedWords.length}`);

  // Ultra-strict word count penalties
  const wordCountDifference = Math.abs(originalWords.length - transcribedWords.length);
  const missingWordRatio = wordCountDifference / originalWords.length;

  if (transcribedWords.length === 0) {
    console.log('No transcribed words found, score = 1');
    return generateSilentResponse(language);
  }

  if (transcribedWords.length < originalWords.length * 0.3) {
    console.log('Too few words transcribed, max score 2');
    result.accuracyScore = Math.min(result.accuracyScore, 2);
  } else if (transcribedWords.length < originalWords.length * 0.6) {
    console.log('Insufficient words transcribed, max score 3');
    result.accuracyScore = Math.min(result.accuracyScore, 3);
  }

  if (missingWordRatio > 0.5) {
    console.log('More than 50% words missing/wrong, max score 3');
    result.accuracyScore = Math.min(result.accuracyScore, 3);
  } else if (missingWordRatio > 0.3) {
    console.log('More than 30% words missing/wrong, max score 4');
    result.accuracyScore = Math.min(result.accuracyScore, 4);
  }

  // Content similarity check
  const similarity = calculateAdvancedTextSimilarity(originalText, result.transcription || '');
  console.log('Text similarity:', similarity);

  if (similarity < 0.2) {
    console.log('Very low similarity, max score 2');
    result.accuracyScore = Math.min(result.accuracyScore, 2);
  } else if (similarity < 0.4) {
    console.log('Low similarity, max score 4');
    result.accuracyScore = Math.min(result.accuracyScore, 4);
  } else if (similarity < 0.6) {
    console.log('Medium similarity, max score 6');
    result.accuracyScore = Math.min(result.accuracyScore, 6);
  }

  // Final validation - if score is still high despite issues, force it down
  if (result.accuracyScore > 7 && (missingWordRatio > 0.1 || similarity < 0.8)) {
    console.log('High score with issues detected, reducing to max 6');
    result.accuracyScore = Math.min(result.accuracyScore, 6);
  }

  console.log('Final accuracy score:', result.accuracyScore);
  return result;
}

function calculateAdvancedTextSimilarity(text1: string, text2: string): number {
  const normalize = (text: string) => text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0);

  const words1 = normalize(text1);
  const words2 = normalize(text2);
  
  if (words1.length === 0 && words2.length === 0) return 1;
  if (words1.length === 0 || words2.length === 0) return 0;

  // Calculate exact matches
  const exactMatches = words1.filter(word => words2.includes(word));
  const exactSimilarity = exactMatches.length / Math.max(words1.length, words2.length);

  // Calculate sequence similarity (order matters)
  let sequenceMatches = 0;
  const minLength = Math.min(words1.length, words2.length);
  for (let i = 0; i < minLength; i++) {
    if (words1[i] === words2[i]) {
      sequenceMatches++;
    }
  }
  const sequenceSimilarity = sequenceMatches / Math.max(words1.length, words2.length);

  // Weighted combination favoring exact matches
  return (exactSimilarity * 0.7) + (sequenceSimilarity * 0.3);
}

function getLanguageInstruction(language: string): string {
  const instructions: Record<string, string> = {
    'Malayalam': 'നിങ്ങൾ മലയാളത്തിൽ അത്യന്തം കർശനമായ ഫീഡ്ബാക്ക് നൽകണം. വ്യാജ സ്കോറുകൾക്ക് ഇടം നൽകരുത്.',
    'Spanish': 'Debes proporcionar comentarios extremadamente estrictos en español. No toleres intentos de hacer trampa.',
    'French': 'Vous devez fournir des commentaires extrêmement stricts en français. Aucune tolérance pour la triche.',
    'German': 'Sie müssen extrem strenge Bewertungen auf Deutsch geben. Keine Toleranz für Betrugsversuche.',
    'Japanese': '日本語で極めて厳格なフィードバックを提供してください。不正行為は一切許可しません。',
    'Korean': '한국어로 극도로 엄격한 피드백을 제공해야 합니다. 부정행위는 절대 용납하지 마세요.',
    'Portuguese (Brazil)': 'Você deve fornecer feedback extremamente rigoroso em português brasileiro. Não tolere tentativas de trapaça.',
    'Portuguese (Portugal)': 'Deve fornecer feedback extremamente rigoroso em português europeu. Não tolere tentativas de batota.',
    'Chinese (Simplified)': '您必须用简体中文提供极其严格的反馈。绝不容忍作弊行为。',
    'Chinese (Traditional)': '您必須用繁體中文提供極其嚴格的反饋。絕不容忍作弊行為。',
    'Italian': 'Devi fornire feedback estremamente rigoroso in italiano. Non tollerare tentativi di imbroglio.',
    'Dutch': 'Je moet extreem strikte feedback geven in het Nederlands. Tolereer geen pogingen tot vals spelen.',
    'Russian': 'Вы должны предоставить крайне строгую обратную связь на русском языке. Не терпите попыток мошенничества.',
    'Arabic': 'يجب عليك تقديم تعليقات صارمة للغاية باللغة العربية. لا تتسامح مع محاولات الغش.',
    'Hindi': 'आपको हिंदी में अत्यंत कठोर फीडबैक देना होगा। धोखाधड़ी के प्रयासों को बर्दाश्त न करें।'
  };

  return instructions[language] || 'You must provide EXTREMELY STRICT feedback in English. NO TOLERANCE for cheating attempts.';
}

function generateSilentResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "SILENT_AUDIO",
      accuracyScore: 1,
      feedback: "ഓഡിയോയിൽ വ്യക്തമായ സംസാരം കണ്ടെത്താനായില്ല. പൂർണ്ണമായും നിശ്ശബ്ദമായ അല്ലെങ്കിൽ അപര്യാപ്തമായ ഓഡിയോ റെക്കോർഡിംഗ്. ദയവായി നൽകിയിരിക്കുന്ന ടെക്സ്റ്റ് പൂർണ്ണമായും ഉറക്കെ വായിക്കുക.",
      improvements: "മൈക്രോഫോൺ ശരിയായി പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക. ടെക്സ്റ്റിന്റെ ഓരോ വാക്കും വ്യക്തമായി ഉച്ചരിക്കുക. റെക്കോർഡിംഗ് സമയത്ത് പൂർണ്ണ ടെക്സ്റ്റ് വായിക്കുക.",
      encouragement: "വിഷമിക്കേണ്ട! മൈക്രോഫോൺ ക്രമീകരണങ്ങൾ പരിശോധിച്ച് ടെക്സ്റ്റ് പൂർണ്ണമായി വായിച്ച് വീണ്ടും ശ്രമിക്കുക."
    },
    'Spanish': {
      transcription: "SILENT_AUDIO",
      accuracyScore: 1,
      feedback: "No se detectó habla clara en la grabación. Audio completamente silencioso o insuficiente. Por favor, lee todo el texto en voz alta.",
      improvements: "Asegúrate de que tu micrófono funcione correctamente. Pronuncia cada palabra del texto claramente. Lee el texto completo durante la grabación.",
      encouragement: "¡No te preocupes! Verifica la configuración de tu micrófono y lee el texto completo antes de intentar de nuevo."
    }
  };

  return responses[language] || {
    transcription: "SILENT_AUDIO",
    accuracyScore: 1,
    feedback: "No clear speech detected in the recording. Completely silent or insufficient audio recording. Please read the entire provided text aloud.",
    improvements: "Ensure your microphone is working properly. Pronounce each word of the text clearly. Read the complete text during recording.",
    encouragement: "Don't worry! Check your microphone settings and read the full text before trying again."
  };
}

function generateFallbackResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "വിശകലനത്തിന് അപര്യാപ്തമായ ഓഡിയോ ഗുണനിലവാരം",
      accuracyScore: 1,
      feedback: "ഓഡിയോ ഗുണനിലവാരം വിശകലനത്തിന് അപര്യാപ്തമാണ്. വ്യക്തമായി സംസാരിച്ച് വീണ്ടും ശ്രമിക്കുക.",
      improvements: "മികച്ച ഓഡിയോ ഗുണനിലവാരത്തോടെ വീണ്ടും റെക്കോർഡ് ചെയ്യുക. സാവധാനത്തിലും വ്യക്തമായും സംസാരിക്കുക.",
      encouragement: "ഉപേക്ഷിക്കരുത്! വീണ്ടും ശ്രമിക്കുക, കൂടുതൽ വ്യക്തമായി സംസാരിക്കുക."
    }
  };

  return responses[language] || {
    transcription: "Audio quality insufficient for analysis",
    accuracyScore: 1,
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
