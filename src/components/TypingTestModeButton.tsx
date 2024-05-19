import React from 'react'

type ModeType = "time" | "words" | "lorem";

interface TypingTestModeButtonProps {
  mode: ModeType;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}

const TypingTestModeButton: React.FC<TypingTestModeButtonProps> = ({ mode, icon, isActive, onClick }) => {
	return (
		<button
    className={`flex items-center justify-between ${isActive ? 'text-slate-900' : ''}`}
    onClick={onClick}
  >
    {icon} {mode}
  </button>
	)
}

export default TypingTestModeButton