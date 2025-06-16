
export function isValidAudioData(audioBase64: string): boolean {
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

export function calculateAdvancedTextSimilarity(text1: string, text2: string): number {
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

export function applyUltraStrictValidation(result: any, originalText: string, language: string, audioSize: number, expectedMinSize: number) {
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

// Import the response generators
import { generateSilentResponse } from './responses.ts';
