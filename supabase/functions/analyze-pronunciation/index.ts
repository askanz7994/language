
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
      
      // Generate response in preferred language
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
              text: `You are an EXTREMELY STRICT ${language} pronunciation tutor. Your job is to be very harsh and accurate in scoring. 

ORIGINAL TEXT TO COMPARE AGAINST:
"${originalText}"

${languageInstruction}

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
- If you cannot make out any clear ${language} words, give score 1-2

Be extremely critical. Most attempts should score between 3-7. Only give 8+ for truly excellent pronunciation.

Return ONLY valid JSON in ${feedbackLanguage}:
{
  "transcription": "what you actually heard in ${language} (write 'Silent' if no speech detected)",
  "accuracyScore": number_1_to_10,
  "feedback": "detailed strict analysis of errors or silence detection in ${feedbackLanguage}",
  "improvements": "specific pronunciation corrections needed in ${feedbackLanguage}",
  "encouragement": "motivating but honest message in ${feedbackLanguage}"
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
        analysisResult = generateFallbackResponse(feedbackLanguage);
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      analysisResult = generateFallbackResponse(feedbackLanguage);
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
      analysisResult = generateSilentResponse(feedbackLanguage);
    }

    // If transcription is very short or empty, cap score at 2
    if (!analysisResult.transcription || analysisResult.transcription.length < 10) {
      analysisResult.accuracyScore = Math.min(analysisResult.accuracyScore, 2);
      const shortAudioResponse = generateShortAudioResponse(feedbackLanguage);
      analysisResult.feedback = shortAudioResponse.feedback;
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
    const errorResponse = generateErrorResponse(error.message);
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getLanguageInstruction(language: string): string {
  const instructions: Record<string, string> = {
    'Malayalam': 'നിങ്ങൾ മലയാളത്തിൽ ഫീഡ്ബാക്ക് നൽകണം. ഉച്ചാരണ വിശകലനം, മെച്ചപ്പെടുത്താനുള്ള മേഖലകൾ, പ്രോത്സാഹനം എന്നിവയെല്ലാം മലയാളത്തിൽ എഴുതുക.',
    'Spanish': 'Debes proporcionar comentarios en español. Escribe el análisis de pronunciación, áreas de mejora y aliento en español.',
    'French': 'Vous devez fournir des commentaires en français. Rédigez l\'analyse de pronunciation, les domaines d\'amélioration et les encouragements en français.',
    'German': 'Sie müssen Feedback auf Deutsch geben. Schreiben Sie die Ausspracheanalyse, Verbesserungsbereiche und Ermutigung auf Deutsch.',
    'Japanese': '日本語でフィードバックを提供してください。発音分析、改善点、励ましをすべて日本語で書いてください。',
    'Korean': '한국어로 피드백을 제공해야 합니다. 발음 분석, 개선할 점, 격려를 모두 한국어로 작성하세요.',
    'Portuguese (Brazil)': 'Você deve fornecer feedback em português brasileiro. Escreva a análise de pronúncia, áreas de melhoria e encorajamento em português.',
    'Portuguese (Portugal)': 'Deve fornecer feedback em português europeu. Escreva a análise de pronúncia, áreas de melhoria e encorajamento em português.',
    'Chinese (Simplified)': '您必须用简体中文提供反馈。请用中文写发音分析、改进领域和鼓励。',
    'Chinese (Traditional)': '您必須用繁體中文提供反饋。請用中文寫發音分析、改進領域和鼓勵。',
    'Italian': 'Devi fornire feedback in italiano. Scrivi l\'analisi della pronuncia, le aree di miglioramento e l\'incoraggiamento in italiano.',
    'Dutch': 'Je moet feedback geven in het Nederlands. Schrijf de uitspraakanalyse, verbeterpunten en aanmoediging in het Nederlands.',
    'Russian': 'Вы должны предоставить обратную связь на русском языке. Напишите анализ произношения, области для улучшения и поощрение на русском языке.',
    'Arabic': 'يجب عليك تقديم تعليقات باللغة العربية. اكتب تحليل النطق ومجالات التحسين والتشجيع بالعربية.',
    'Hindi': 'आपको हिंदी में फीडबैक देना होगा। उच्चारण विश्लेषण, सुधार के क्षेत्र और प्रोत्साहन हिंदी में लिखें।'
  };

  return instructions[language] || 'You must provide feedback in English. Write the pronunciation analysis, areas for improvement, and encouragement in English.';
}

function generateSilentResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "നിശബ്ദമായ ഓഡിയോ",
      accuracyScore: 1,
      feedback: "റെക്കോർഡിംഗിൽ വ്യക്തമായ സംസാരം കണ്ടെത്താനായില്ല. മൈക്രോഫോൺ പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കി മലയാളം ടെക്സ്റ്റ് ഉറക്കെ വായിക്കുക.",
      improvements: "മൈക്രോഫോൺ അനുമതികളും ക്രമീകരണങ്ങളും പരിശോധിക്കുക. നൽകിയിരിക്കുന്ന ടെക്സ്റ്റ് വ്യക്തമായി വായിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
      encouragement: "വിഷമിക്കേണ്ട! മൈക്രോഫോൺ അൺമ്യൂട്ട് ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കി മലയാളം ടെക്സ്റ്റ് വ്യക്തമായി സംസാരിക്കാൻ ശ്രമിക്കുക."
    },
    'Spanish': {
      transcription: "Audio silencioso",
      accuracyScore: 1,
      feedback: "No se detectó habla clara en la grabación. Asegúrate de que tu micrófono funcione y lee el texto en español en voz alta.",
      improvements: "Verifica los permisos y configuración del micrófono. Asegúrate de leer realmente el texto proporcionado en voz alta durante la grabación.",
      encouragement: "¡No te preocupes! Asegúrate de que tu micrófono no esté silenciado e intenta hablar el texto en español claramente."
    },
    'French': {
      transcription: "Audio silencieux",
      accuracyScore: 1,
      feedback: "Aucune parole claire n'a été détectée dans l'enregistrement. Assurez-vous que votre microphone fonctionne et lisez le texte français à voix haute.",
      improvements: "Vérifiez les autorisations et paramètres du microphone. Assurez-vous de lire réellement le texte fourni à voix haute pendant l'enregistrement.",
      encouragement: "Ne vous inquiétez pas ! Assurez-vous que votre microphone n'est pas coupé et essayez de parler le texte français clairement."
    }
  };

  return responses[language] || {
    transcription: "No speech detected",
    accuracyScore: 1,
    feedback: "No speech was detected in the recording. Please ensure your microphone is working and speak clearly into it while reading the text.",
    improvements: "Check your microphone permissions and settings. Make sure to actually read the provided text aloud during recording.",
    encouragement: "Don't worry! Make sure your microphone is unmuted and try speaking the text clearly."
  };
}

function generateFallbackResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      transcription: "ഓഡിയോ ഗുണനിലവാരം വിശകലനത്തിന് വേണ്ടത്ര മതിയായില്ല",
      accuracyScore: 1,
      feedback: "ഓഡിയോ അവ്യക്തമാണ്, വളരെ ചെറുതാണ്, അല്ലെങ്കിൽ തിരിച്ചറിയാവുന്ന മലയാളം സംസാരം ഇല്ല. മൈക്രോഫോണിലേക്ക് വ്യക്തമായി സംസാരിക്കുകയും നൽകിയിരിക്കുന്ന പൂർണ്ണമായ ടെക്സ്റ്റ് വായിക്കുകയും ചെയ്യുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
      improvements: "മികച്ച ഓഡിയോ ഗുണനിലവാരത്തോടെ വീണ്ടും റെക്കോർഡ് ചെയ്യുക. സാവധാനത്തിലും വ്യക്തമായും സംസാരിക്കുക, നൽകിയിരിക്കുന്ന മലയാളം ടെക്സ്റ്റ് മുഴുവനായും വായിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കുക.",
      encouragement: "ഉപേക്ഷിക്കരുത്! മൈക്രോഫോൺ പ്രവർത്തിക്കുന്നുണ്ടെന്ന് ഉറപ്പാക്കി ടെക്സ്റ്റ് കൂടുതൽ സാവധാനത്തിലും വ്യക്തമായും വായിക്കാൻ ശ്രമിക്കുക."
    }
  };

  return responses[language] || {
    transcription: "Audio quality too poor to analyze",
    accuracyScore: 1,
    feedback: "Audio is unclear, too short, or contains no recognizable speech. Please ensure you speak clearly into the microphone and read the complete text provided.",
    improvements: "Record again with better audio quality. Speak slowly and clearly, ensuring you read the entire provided text.",
    encouragement: "Don't give up! Make sure your microphone is working and try reading the text more slowly and clearly."
  };
}

function generateShortAudioResponse(language: string) {
  const responses: Record<string, any> = {
    'Malayalam': {
      feedback: "റെക്കോർഡിംഗ് വളരെ ചെറുതായിരിക്കുകയോ അവ്യക്തമായിരിക്കുകയോ ചെയ്യുന്നു."
    }
  };

  return responses[language] || {
    feedback: "Recording appears to be too short or unclear."
  };
}

function generateErrorResponse(errorMessage: string) {
  return {
    error: errorMessage,
    transcription: "Error during analysis",
    accuracyScore: 1,
    feedback: "Technical error occurred during pronunciation analysis. Please check your internet connection and try again.",
    improvements: "Ensure your microphone is working and you have a stable internet connection. Try recording again.",
    encouragement: "Technical issues happen! Please try again."
  };
}
