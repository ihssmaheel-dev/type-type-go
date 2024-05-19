import React from 'react'
import ResetButton from './ResetButton';

type ModeType = "time" | "words" | "lorem";

interface StatsProps {
	mode: ModeType 
	timeLeft: number;
	mistakes: number;
	accuracy: number;
	WPM: number;
	CPM: number;
	reset: () => void;
}

const Stats: React.FC<StatsProps> = ({
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
			<div className='w-full bg-gray-200 rounded-lg px-8 py-2 flex items-center justify-between mr-4'>
				{
					mode === "time" ? <p>Time Left: <strong>{timeLeft}</strong></p> : ""  
				}
				<p>Mistakes: <strong>{mistakes}</strong></p>
				<p>Accuracy: <strong>{accuracy}</strong></p>
				<p>WPM: <strong>{WPM}</strong></p>
				<p>CPM: <strong>{CPM}</strong></p>
			</div>
			<ResetButton reset={reset}/>
		</div>
	)
}

export default Stats;