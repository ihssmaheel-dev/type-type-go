import React from 'react';
import TimeSelectionOptions from './TimeSelectionOptions';
import WordSelectionOptions from './WordsSelectionOptions';
import { ModeType } from '../types';

interface ModeSelectorOptionsProps {
  mode: ModeType;
  timeOptions: number[];
  maxTime: number;
  onChangeTime: (time: number) => void;
  wordOptions: number[];
  maxWords: number;
  onChangeWords: (words: number) => void;
}

const ModeSelectorOptions: React.FC<ModeSelectorOptionsProps> = ({ mode, timeOptions, maxTime, onChangeTime, wordOptions, maxWords, onChangeWords }) => {
  return (
    <div className="w-9/12 flex items-center justify-between">
      {mode === 'time' ? (
        <TimeSelectionOptions timeOptions={timeOptions} maxTime={maxTime} onChangeTime={onChangeTime} />
      ) : (
        <WordSelectionOptions wordOptions={wordOptions} maxWords={maxWords} onChangeWords={onChangeWords} />
      )}
    </div>
  );
};

export default ModeSelectorOptions;
