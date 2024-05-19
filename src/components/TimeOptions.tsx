import React from 'react';

interface TimeOptionsProps {
	timeOptions: number[];
	maxTime: number;
	onChangeTime: (time: number) => void;
}

const TimeOptions: React.FC<TimeOptionsProps> = ({ timeOptions, maxTime, onChangeTime }) => {
	const handleTimeOptionClick = (option: number) => {
		onChangeTime(option);
	};

	return (
		<>
			{timeOptions.map(option => (
				<button
					key={option}
					className={`mr-3 ${maxTime === option ? "text-slate-900" : ""}`}
					onClick={() => handleTimeOptionClick(option)}
				>
					{option}
				</button>
			))}
		</>
	);
};

export default TimeOptions;
