
export function generateSilentResponse(language: string) {
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

export function generateFallbackResponse(language: string) {
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

export function generateErrorResponse(errorMessage: string) {
  return {
    error: errorMessage,
    transcription: "Analysis error occurred",
    accuracyScore: 1,
    feedback: "Technical error during pronunciation analysis. Please check your connection and try again.",
    improvements: "Ensure stable internet connection and proper microphone function. Try recording again.",
    encouragement: "Technical issues happen! Please try again."
  };
}
