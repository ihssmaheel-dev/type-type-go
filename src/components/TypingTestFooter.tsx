import React from 'react'
import Stats from './Stats'
import ResetButton from './ResetButton';

type ModeType = "time" | "words" | "lorem";

interface TypingTestFooterProps {
	mode: ModeType 
	timeLeft: number;
	mistakes: number;
	accuracy: number;
	WPM: number;
	CPM: number;
	reset: () => void;
}

const TypingTestFooter: React.FC<TypingTestFooterProps> = ({
	mode,
	timeLeft,
	mistakes,
	accuracy,
	WPM,
	CPM,
	reset
}) => {
	return (
		<div className='w-10/12 flex text-lg font-bold text-slate-900 shadow select-none'>
			<Stats mode={mode} timeLeft={timeLeft} mistakes={mistakes} accuracy={accuracy} WPM={WPM} CPM={CPM}/>
			<ResetButton reset={reset}/>
		</div>
	)
}

export default TypingTestFooter