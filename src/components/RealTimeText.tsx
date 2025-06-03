
import React, { useState, useEffect } from 'react';

interface RealTimeTextProps {
  text: string;
  isListening: boolean;
  feedback?: string;
}

const RealTimeText: React.FC<RealTimeTextProps> = ({ text, isListening, feedback }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (!isListening) {
      setCurrentWordIndex(0);
      return;
    }

    // Simulate real-time word progression while listening
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => {
        if (prev < words.length - 1) {
          return prev + 1;
        }
        return 0; // Loop back to start
      });
    }, 1500); // Change word every 1.5 seconds

    return () => clearInterval(interval);
  }, [isListening, words.length]);

  // If we have feedback (after analysis), display it instead of original text
  if (feedback && !isListening) {
    return (
      <div className="text-lg leading-relaxed p-4 bg-muted rounded-lg">
        <div className="mb-2 text-sm font-semibold text-blue-600">Pronunciation Analysis:</div>
        <div dangerouslySetInnerHTML={{ __html: feedback.replace(/x\s/g, '<span style="color: red;">❌ </span>').replace(/\(✓([^)]+)\)/g, '<span style="color: green;">(✓$1)</span>') }} />
      </div>
    );
  }

  return (
    <div className="text-lg leading-relaxed p-4 bg-muted rounded-lg">
      {words.map((word, index) => (
        <span
          key={index}
          className={`${
            isListening && index === currentWordIndex
              ? 'underline decoration-2 decoration-blue-500 bg-blue-50'
              : ''
          }`}
          style={{
            textDecorationThickness: isListening && index === currentWordIndex ? '2px' : 'auto'
          }}
        >
          {word}
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </div>
  );
};

export default RealTimeText;
