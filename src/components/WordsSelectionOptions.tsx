import React from 'react';

interface WordSelectionOptionsProps {
	wordOptions: number[];
	maxWords: number;
	onChangeWords: (words: number) => void;
}

const WordSelectionOptions: React.FC<WordSelectionOptionsProps> = ({ wordOptions, maxWords, onChangeWords }) => {
	const handleWordOptionClick = (option: number) => {
		onChangeWords(option);
	};

	return (
		<>
			{wordOptions.map(option => (
				<button
					key={option}
					className={`mr-3 ${maxWords === option ? "text-slate-900" : ""}`}
					onClick={() => handleWordOptionClick(option)}
				>
					{option}
				</button>
			))}
		</>
	);
};

export default WordSelectionOptions;
