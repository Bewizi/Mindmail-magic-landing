
import { useState, useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  speed?: number;
}

const AnimatedText = ({
  text,
  className = '',
  once = true,
  delay = 0,
  speed = 50,
}: AnimatedTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const startAnimation = () => {
      if (isRunning) return;
      setIsRunning(true);
      
      let i = 0;
      setDisplayedText('');
      
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
          setIsRunning(false);
        }
      }, speed);
      
      return () => clearInterval(intervalId);
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(startAnimation, delay);
            if (once) {
              observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [text, once, delay, speed, isRunning]);
  
  return (
    <div ref={containerRef} className={className}>
      {displayedText}
      <span className="inline-block w-[2px] h-[1em] bg-cosmic-400 opacity-70 ml-0.5 animate-pulse"></span>
    </div>
  );
};

export default AnimatedText;
