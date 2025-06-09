
export const getSpeechAnalysisTranslations = (language: string) => {
  const translations: Record<string, { feedback: string; improvements: string; encouragement: string }> = {
    'Malayalam': {
      feedback: 'ഫീഡ്ബാക്ക്',
      improvements: 'മെച്ചപ്പെടുത്താനുള്ള മേഖലകൾ',
      encouragement: 'പ്രോത്സാഹനം'
    },
    'Spanish': {
      feedback: 'Comentarios',
      improvements: 'Áreas de mejora',
      encouragement: 'Ánimo'
    },
    'French': {
      feedback: 'Commentaires',
      improvements: 'Domaines d\'amélioration',
      encouragement: 'Encouragement'
    },
    'German': {
      feedback: 'Rückmeldung',
      improvements: 'Verbesserungsbereiche',
      encouragement: 'Ermutigung'
    },
    'Japanese': {
      feedback: 'フィードバック',
      improvements: '改善点',
      encouragement: '励まし'
    },
    'Korean': {
      feedback: '피드백',
      improvements: '개선할 점',
      encouragement: '격려'
    },
    'Portuguese (Brazil)': {
      feedback: 'Comentários',
      improvements: 'Áreas de melhoria',
      encouragement: 'Encorajamento'
    },
    'Portuguese (Portugal)': {
      feedback: 'Comentários',
      improvements: 'Áreas de melhoria',
      encouragement: 'Encorajamento'
    },
    'Chinese (Simplified)': {
      feedback: '反馈',
      improvements: '改进领域',
      encouragement: '鼓励'
    },
    'Chinese (Traditional)': {
      feedback: '反饋',
      improvements: '改進領域',
      encouragement: '鼓勵'
    },
    'Italian': {
      feedback: 'Feedback',
      improvements: 'Aree di miglioramento',
      encouragement: 'Incoraggiamento'
    },
    'Dutch': {
      feedback: 'Feedback',
      improvements: 'Verbeterpunten',
      encouragement: 'Aanmoediging'
    },
    'Russian': {
      feedback: 'Обратная связь',
      improvements: 'Области для улучшения',
      encouragement: 'Поощрение'
    },
    'Arabic': {
      feedback: 'تعليقات',
      improvements: 'مجالات التحسين',
      encouragement: 'تشجيع'
    },
    'Hindi': {
      feedback: 'फीडबैक',
      improvements: 'सुधार के क्षेत्र',
      encouragement: 'प्रोत्साहन'
    }
  };

  return translations[language] || {
    feedback: 'Feedback',
    improvements: 'Areas for improvement',
    encouragement: 'Encouragement'
  };
};
