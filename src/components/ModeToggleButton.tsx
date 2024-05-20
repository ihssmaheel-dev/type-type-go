import React from 'react'
import { ModeType } from '../types';

interface ModeToggleButtonProps {
  mode: ModeType;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}

const ModeToggleButton: React.FC<ModeToggleButtonProps> = ({ mode, icon, isActive, onClick }) => {
	return (
		<button
    className={`flex items-center justify-between ${isActive ? 'text-slate-900' : ''} transition-all duration-200`}
    onClick={onClick}
  >
    {icon} {mode}
  </button>
	)
}

export default ModeToggleButton