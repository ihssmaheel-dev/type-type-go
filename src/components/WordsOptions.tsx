import React from 'react';

interface WordOptionsProps {
	wordOptions: number[];
	maxWords: number;
	onChangeWords: (words: number) => void;
}

const WordOptions: React.FC<WordOptionsProps> = ({ wordOptions, maxWords, onChangeWords }) => {
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

export default WordOptions;
