import React from 'react'
import { ModeType } from '../types';

interface TypingStatsDisplayProps {
	mode: ModeType 
	timeLeft: number;
	mistakes: number;
	accuracy: number;
	WPM: number;
	CPM: number;
}

const TypingStatsDisplay: React.FC<TypingStatsDisplayProps> = ({
	mode,
	timeLeft,
	mistakes,
	accuracy,
	WPM,
	CPM,
}) => {
	return (
		<div className='w-full bg-gray-200 rounded-lg px-8 py-2 flex items-center justify-between mr-4'>
			{
				mode === "time" ? <p>Time Left: <strong>{timeLeft}</strong></p> : ""  
			}
			<p>Mistakes: <strong>{mistakes}</strong></p>
			<p>Accuracy: <strong>{accuracy}</strong></p>
			<p>WPM: <strong>{WPM}</strong></p>
			<p>CPM: <strong>{CPM}</strong></p>
		</div>
	)
}

export default TypingStatsDisplay;