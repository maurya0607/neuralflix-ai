import { useState, useEffect } from 'react';

export const useTypewriter = (text, speed = 35) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    setIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (text.length > 0) {
      setIsComplete(true);
    }
  }, [index, text, speed]);

  return { displayedText, isComplete };
};
