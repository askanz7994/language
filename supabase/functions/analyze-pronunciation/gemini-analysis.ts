
export async function performGeminiAnalysis(
  audioBase64: string,
  originalText: string,
  feedbackLanguage: string,
  geminiApiKey: string
) {
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
    throw new Error('Failed to parse analysis result');
  }

  return analysisResult;
}

// Import the language instruction function
import { getLanguageInstruction } from './language-instructions.ts';
