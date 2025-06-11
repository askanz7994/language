
import { useState, useCallback } from "react";

export const useAudioState = (onWordHighlight?: (wordIndex: number) => void) => {
  const [isReading, setIsReading] = useState(false);

  const clearHighlighting = useCallback(() => {
    if (onWordHighlight) {
      onWordHighlight(-1);
    }
  }, [onWordHighlight]);

  const startReading = useCallback(() => {
    setIsReading(true);
    clearHighlighting();
  }, [clearHighlighting]);

  const stopReading = useCallback(() => {
    setIsReading(false);
    clearHighlighting();
  }, [clearHighlighting]);

  return {
    isReading,
    startReading,
    stopReading,
    clearHighlighting
  };
};
