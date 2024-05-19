import React from 'react';
import { FaAlignLeft, FaFont, FaHourglass } from 'react-icons/fa';
import TypingTestModeButton from './TypingTestModeButton';

type ModeType = "time" | "words" | "lorem";

interface TypingModeSelectorProps {
  mode: ModeType;
  onModeChange: (mode: ModeType) => void;
}

const TypingModeSelector: React.FC<TypingModeSelectorProps> = ({ mode, onModeChange }) => {
  const icons = {
    time: <FaHourglass className='mr-2' />,
    words: <FaFont className='mr-2' />,
    lorem: <FaAlignLeft className='mr-2' />,
  };

  return (
    <>
      {Object.keys(icons).map((key) => (
        <React.Fragment key={key}>
          <TypingTestModeButton
            mode={key as ModeType}
            icon={icons[key as ModeType]}
            isActive={mode === key}
            onClick={() => onModeChange(key as ModeType)}
          />
          {key !== 'lorem' && <span className="text-slate-600 mx-6"></span>}
        </React.Fragment>
      ))}
    </>
  );
};

export default TypingModeSelector;
