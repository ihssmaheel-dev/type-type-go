import React from 'react'
import ResetButton from './ResetButton';

type ModeType = "time" | "words" | "lorem";

interface StatsProps {
	mode: ModeType 
	timeLeft: number;
	mistakes: number;
	WPM: number;
	CPM: number;
	reset: () => void;
}

const Stats: React.FC<StatsProps> = ({
	mode,
	timeLeft,
	mistakes,
	WPM,
	CPM,
	reset
}) => {
	return (
		<div className='w-10/12 p-2 px-8 rounded-lg bg-gray-200 shadow text-lg font-bold flex items-center justify-between text-slate-900 select-none'>
			{
				mode === "time" ? <p>Time Left: <strong>{timeLeft}</strong></p> : ""  
			}
			<p>Mistakes: <strong>{mistakes}</strong></p>
			<p>WPM: <strong>{WPM}</strong></p>
			<p>CPM: <strong>{CPM}</strong></p>
			<ResetButton reset={reset}/>
		</div>
	)
}

export default Stats;