import React from 'react';
import { FaAlignLeft, FaFont, FaHourglass } from 'react-icons/fa';

type ModeType = "time" | "words" | "lorem";

interface ModeButtonProps {
  mode: ModeType;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}

const ModeButton: React.FC<ModeButtonProps> = ({ mode, icon, isActive, onClick }) => (
  <button
    className={`flex items-center justify-between ${isActive ? 'text-slate-900' : ''}`}
    onClick={onClick}
  >
    {icon} {mode}
  </button>
);

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
          <ModeButton
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
