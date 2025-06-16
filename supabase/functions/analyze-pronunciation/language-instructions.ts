
export function getLanguageInstruction(language: string): string {
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
