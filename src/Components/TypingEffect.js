import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed, onTypingComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingTimer = setInterval(() => {
      const newText = text.substring(0, currentIndex + 1);
      setDisplayText(newText);

      if (newText === text) {
        clearInterval(typingTimer);
        setIsTyping(false);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, speed);

    return () => clearInterval(typingTimer);
  }, [currentIndex, speed, text]);

  useEffect(() => {
    if (!isTyping) {
      onTypingComplete(true);
    }
  }, [isTyping, onTypingComplete]);

  return (
    <span>{displayText}</span>
  );
};

export default TypingEffect;