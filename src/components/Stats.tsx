import React from 'react'
import ResetButton from './ResetButton';

interface StatsProps {
	timeLeft: number;
	mistakes: number;
	WPM: number;
	CPM: number;
	reset: () => void;
}

const Stats: React.FC<StatsProps> = ({
	timeLeft,
	mistakes,
	WPM,
	CPM,
	reset
}) => {
	return (
		<div className="flex justify-between items-center mt-4 pt-2.5 text-xl border-t border-solid border-slate-900 text-slate-900">
				<p>Time Left: <strong>{timeLeft}</strong></p>
				<p>Mistakes: <strong>{mistakes}</strong></p>
				<p>WPM: <strong>{WPM}</strong></p>
				<p>CPM: <strong>{CPM}</strong></p>
				<ResetButton reset={reset}/>
			</div>
	)
}

export default Stats;