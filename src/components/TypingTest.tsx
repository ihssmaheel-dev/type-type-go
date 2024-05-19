import React, { useEffect, useRef, useState } from 'react';
import TextDisplay from './TextDisplay';
import UserInput from './UserInput';
import Stats from './Stats';
import { calculateAccuracy, calculateCPM, calculateWPM } from '../utils/helper';
import { faker } from '@faker-js/faker';
import TypingModeSelector from './TypingModeSelector';

const generateRandomParagraph = (count: number, mode: ModeType) => {
  if (mode === "words") {
    return faker.word.words(count).toLowerCase();
  } else if (mode === "lorem") {
    return faker.lorem.words(count).toLowerCase();
  } else {
    return faker.word.words(count).toLowerCase();
  }
}

type CorrectWrongType = "correct" | "wrong" | "";
type ModeType = "time" | "words" | "lorem";

const TypingTest = () => {
  const [mode, setMode] = useState<ModeType>("words");
  const [maxWords, setMaxWords] = useState(50);
  const [paragraph, setParagraph] = useState(generateRandomParagraph(maxWords, mode));
  const [maxTime, setMaxTime] = useState(60000);
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [mistakes, setMistakes] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
	const [errors, setErrors] = useState(0);
	const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [correctWrong, setCorrectWrong] = useState<CorrectWrongType[]>([]);

  const handleFocus = () => {
    inputRef.current?.focus();
  }

  useEffect(() => {
    inputRef.current?.focus();
    setCorrectWrong(Array(charRefs.current.length).fill(''));
    charRefs.current = Array(paragraph.length).fill(null);
  }, [paragraph]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTyping && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTimeLeft => (prevTimeLeft - 1));

        const correctChars = charIndex - mistakes;
        const totalTime = maxTime - timeLeft;

        setCPM(calculateCPM(correctChars, totalTime));
        setWPM(calculateWPM(correctChars, totalTime));
      }, 1000);
    } else {
      setIsTyping(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTyping, timeLeft]);

  useEffect(() => {
    reset();
  }, [maxWords, maxTime, mode]);

  useEffect(() => {
		if(charIndex > 400) {
			scrollToEnd();
		}
  }, [paragraph, charIndex]);

  const scrollToEnd = () => {
    const container = document.getElementById('typing-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const characters = charRefs.current;

    if (isTyping && e.code === 'Backspace') {
      if (charIndex < 0) return;

      setCharIndex((prevIndex) => prevIndex - 1);
      const isWrong = correctWrong[charIndex - 1] === 'wrong';
      isWrong && setMistakes((prevMistakes) => prevMistakes - 1);

      setCorrectWrong((prevCorrectWrong) => {
        const newCorrectWrong = [...prevCorrectWrong];
        newCorrectWrong[charIndex - 1] = '';

        return newCorrectWrong;
      });
    }

    if (e.key.length === 1) {
      const typedChar = e.key;
      const currentChar = characters[charIndex]?.textContent;

      if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) setIsTyping(true);

        setCharIndex((prevIndex) => prevIndex + 1);

        setCorrectWrong((prevCorrectWrong) => {
          const newCorrectWrong = [...prevCorrectWrong];
          newCorrectWrong[charIndex] = typedChar === currentChar ? 'correct' : 'wrong';
          if (typedChar !== currentChar) {
            setMistakes((prevMistakes) => prevMistakes + 1);
						setErrors((prevErrors) => prevErrors + 1);
          }

          return newCorrectWrong;
        });

        if (charIndex === characters.length - 1) setIsTyping(false);

        setAccuracy(calculateAccuracy(charIndex, errors, typedChar, currentChar));
      } else {
        setIsTyping(false);
      }
    }
  };

  const handleTimeChange = (time: number) => {
    setMaxTime(time);
    setTimeLeft(time);
    reset();
  }

  const handleWordChange = (words: number) => {
    setMaxWords(words);
    reset();
  }

  const handleModeChange = (mode: ModeType) => {
    setMode(mode);
		if(mode === "time") {
			setMaxWords(300);
		} else {
			setMaxTime(60000);
		}
    reset();
  }

  const reset = () => {
    const newParagraph = generateRandomParagraph(maxWords, mode);
    setParagraph(newParagraph);
    setIsTyping(false);
    setTimeLeft(maxTime);
    setCharIndex(0);
    setMistakes(0);
		setErrors(0);
    setCPM(0);
    setWPM(0);
		setAccuracy(100);
    setCorrectWrong(Array(charRefs.current.length).fill(""));
    charRefs.current = Array(newParagraph.length).fill(null);
    inputRef.current?.focus();
  }

  return (
    <div className='min-h-screen bg-slate-900 flex flex-col items-center justify-center font-noto-sans-mono tracking-wider px-12' onClick={handleFocus}>
      <TypingModeSelector mode={mode} maxWords={maxWords} maxTime={maxTime} onChangeTime={handleTimeChange} onChangeWords={handleWordChange} onModeChange={handleModeChange}/>
      <div id="typing-container" className={`w-10/12 max-h-80 overflow-y-auto m-4 p-8 rounded-lg bg-gray-200 shadow`} style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        <UserInput
          inputRef={inputRef}
          handleKeyDown={handleKeyDown}
        />
        <TextDisplay
          paragraph={paragraph}
          charIndex={charIndex}
          correctWrong={correctWrong}
          charRefs={charRefs}
        />
      </div>
      <Stats mode={mode} timeLeft={timeLeft} mistakes={mistakes} accuracy={accuracy} WPM={WPM} CPM={CPM} reset={reset} />
    </div>
  )
}

export default TypingTest;
