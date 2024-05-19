import React from 'react'
import TypingStatsDisplay from './TypingStatsDisplay'
import RefreshButton from './RefreshButton';

type ModeType = "time" | "words" | "lorem";

interface TypingTestFooterBarProps {
	mode: ModeType 
	timeLeft: number;
	mistakes: number;
	accuracy: number;
	WPM: number;
	CPM: number;
	reset: () => void;
}

const TypingTestFooterBar: React.FC<TypingTestFooterBarProps> = ({
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
			<TypingStatsDisplay mode={mode} timeLeft={timeLeft} mistakes={mistakes} accuracy={accuracy} WPM={WPM} CPM={CPM}/>
			<RefreshButton reset={reset}/>
		</div>
	)
}

export default TypingTestFooterBar