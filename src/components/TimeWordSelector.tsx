import React from 'react';
import TimeOptions from './TimeOptions';
import WordsOptions from './WordsOptions';

type ModeType = "time" | "words" | "lorem";

interface TimeWordSelectorProps {
  mode: ModeType;
  timeOptions: number[];
  maxTime: number;
  onChangeTime: (time: number) => void;
  wordOptions: number[];
  maxWords: number;
  onChangeWords: (words: number) => void;
}

const TimeWordSelector: React.FC<TimeWordSelectorProps> = ({ mode, timeOptions, maxTime, onChangeTime, wordOptions, maxWords, onChangeWords }) => {
  return (
    <div className="w-full flex items-center justify-between">
      {mode === 'time' ? (
        <TimeOptions timeOptions={timeOptions} maxTime={maxTime} onChangeTime={onChangeTime} />
      ) : (
        <WordsOptions wordOptions={wordOptions} maxWords={maxWords} onChangeWords={onChangeWords} />
      )}
    </div>
  );
};

export default TimeWordSelector;
