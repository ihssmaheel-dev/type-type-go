import React from 'react';
import { FaAlignLeft, FaFont, FaHourglass } from 'react-icons/fa';
import ModeToggleButton from './ModeToggleButton';

type ModeType = "time" | "words" | "lorem";

interface ModeSelectorProps {
  mode: ModeType;
  onModeChange: (mode: ModeType) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  const icons = {
    time: <FaHourglass className='mr-2' />,
    words: <FaFont className='mr-2' />,
    lorem: <FaAlignLeft className='mr-2' />,
  };

  return (
    <div className='w-full flex items-center justify-between'>
      {Object.keys(icons).map((key) => (
        <React.Fragment key={key}>
          <ModeToggleButton
            mode={key as ModeType}
            icon={icons[key as ModeType]}
            isActive={mode === key}
            onClick={() => onModeChange(key as ModeType)}
          />
          {key !== 'lorem' && <span className="text-slate-600 mx-6"></span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ModeSelector;
