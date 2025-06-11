
export interface GrammarTopic {
  topic: string;
  example: string;
  explanation: string;
  audioText: string;
}

export const grammarTopics: GrammarTopic[] = [
  { 
    topic: "Present Simple", 
    example: "I <u>eat</u> breakfast every morning.", 
    explanation: "Used for habits and facts",
    audioText: "I eat breakfast every morning"
  },
  { 
    topic: "Present Continuous", 
    example: "I <u>am eating</u> breakfast now.", 
    explanation: "Used for actions happening now",
    audioText: "I am eating breakfast now"
  },
  { 
    topic: "Past Simple", 
    example: "I <u>ate</u> breakfast yesterday.", 
    explanation: "Used for completed past actions",
    audioText: "I ate breakfast yesterday"
  },
  { 
    topic: "Past Continuous", 
    example: "I <u>was eating</u> when you called.", 
    explanation: "Used for ongoing past actions",
    audioText: "I was eating when you called"
  },
  { 
    topic: "Present Perfect", 
    example: "I <u>have eaten</u> breakfast.", 
    explanation: "Used for past actions with present relevance",
    audioText: "I have eaten breakfast"
  },
  { 
    topic: "Future Simple", 
    example: "I <u>will eat</u> breakfast tomorrow.", 
    explanation: "Used for future plans and predictions",
    audioText: "I will eat breakfast tomorrow"
  },
  { 
    topic: "Articles (a, an, the)", 
    example: "I saw <u>a</u> cat. <u>The</u> cat was black.", 
    explanation: "Used before nouns",
    audioText: "I saw a cat. The cat was black"
  },
  { 
    topic: "Plural Nouns", 
    example: "One <u>book</u>, two <u>books</u>, three <u>children</u>.", 
    explanation: "Regular and irregular plurals",
    audioText: "One book, two books, three children"
  },
  { 
    topic: "Possessive Forms", 
    example: "<u>John's</u> car, the <u>students'</u> books.", 
    explanation: "Shows ownership",
    audioText: "John's car, the students' books"
  },
  { 
    topic: "Comparative Adjectives", 
    example: "<u>Bigger</u>, <u>better</u>, <u>more beautiful</u>.", 
    explanation: "Comparing two things",
    audioText: "Bigger, better, more beautiful"
  },
  { 
    topic: "Superlative Adjectives", 
    example: "The <u>biggest</u>, the <u>best</u>, the <u>most beautiful</u>.", 
    explanation: "Comparing three or more things",
    audioText: "The biggest, the best, the most beautiful"
  },
  { 
    topic: "Question Formation", 
    example: "<u>Do</u> you like coffee? <u>What time</u> is it?", 
    explanation: "Making questions with do/does/did and wh-words",
    audioText: "Do you like coffee? What time is it?"
  },
  { 
    topic: "Prepositions of Time", 
    example: "<u>At</u> 3 o'clock, <u>on</u> Monday, <u>in</u> January.", 
    explanation: "At, on, in for time expressions",
    audioText: "At 3 o'clock, on Monday, in January"
  },
  { 
    topic: "Prepositions of Place", 
    example: "<u>At</u> home, <u>on</u> the table, <u>in</u> the box.", 
    explanation: "At, on, in for location",
    audioText: "At home, on the table, in the box"
  },
  { 
    topic: "Modal Verbs", 
    example: "I <u>can</u> swim. You <u>should</u> study.", 
    explanation: "Can, could, should, would, must",
    audioText: "I can swim. You should study"
  },
  { 
    topic: "Conditional Sentences", 
    example: "<u>If</u> it rains, I <u>will</u> stay home.", 
    explanation: "First, second, and third conditionals",
    audioText: "If it rains, I will stay home"
  },
  { 
    topic: "Passive Voice", 
    example: "The book <u>was written</u> by Shakespeare.", 
    explanation: "Focus on the action, not the doer",
    audioText: "The book was written by Shakespeare"
  },
  { 
    topic: "Reported Speech", 
    example: "He <u>said that</u> he was tired.", 
    explanation: "Reporting what someone said",
    audioText: "He said that he was tired"
  },
  { 
    topic: "Gerunds and Infinitives", 
    example: "I enjoy <u>reading</u>. I want <u>to read</u>.", 
    explanation: "Verb forms used as nouns",
    audioText: "I enjoy reading. I want to read"
  },
  { 
    topic: "Phrasal Verbs", 
    example: "<u>Turn on</u> the light. <u>Look after</u> the baby.", 
    explanation: "Verbs with particles that change meaning",
    audioText: "Turn on the light. Look after the baby"
  }
];
