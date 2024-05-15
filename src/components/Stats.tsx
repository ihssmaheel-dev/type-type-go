import React from 'react'
import { MdRefresh } from 'react-icons/md';

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
				<button type='button' className='px-3 py-2 outline-none border border-solid border-gray-400 bg-slate-900 rounded-md cursor-pointer text-white text-base transition-all duration-500 hover:bg-slate-800' onClick={reset}>
					<MdRefresh />
				</button>
			</div>
	)
}

export default Stats