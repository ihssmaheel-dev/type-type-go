import React, { useEffect, useRef, useState } from 'react'
import useParagraphGenerator from '../hooks/useParagraphGenerator';
import useTimer from '../hooks/useTimer';
import useTypingLogic from '../hooks/useTypingLogic';
import TypingModeSelector from './TypingModeSelector';
import UserInput from './UserInput';
import TextDisplay from './TextDisplay';
import Stats from './Stats';


type ModeType = "words" | "time" | "lorem";

const TypingTest = () => {
	const [mode, setMode] = useState<ModeType>("words");
	const [maxWords, setMaxWords] = useState(50);
	const [maxTime, setMaxTime] = useState(60_000);


	const { paragraph, generateNewParagraph } = useParagraphGenerator(mode, maxWords);
	const { timeLeft, startTimer, resetTimer, updateMaxTime } = useTimer(maxTime);
	const { charIndex, charRefs, mistakes, WPM, CPM, accuracy, correctWrong, handleKeydown, resetTyping } = useTypingLogic(paragraph, maxTime, timeLeft);

	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		inputRef.current?.focus();
		generateNewParagraph();
		resetTimer();
	}, [maxWords, maxTime, mode]);

	const handleModeChange = (newMode: ModeType) => {
		setMode(newMode);
		if(newMode === "time") {
			setMaxWords(200);
			setMaxTime(60);
		} else {
			setMaxWords(50);
			setMaxTime(60_000);
		}

		generateNewParagraph();
		resetTyping();
	};

	const handleFocus = () => {
		inputRef.current?.focus();
	}

	return (
		<div className='min-h-screen px-12 bg-slate-900 flex flex-col items-center justify-center font-noto-sans-mono tracking-wider' onClick={handleFocus}>
			<TypingModeSelector 
				mode={mode}
				maxWords={maxWords}
				maxTime={maxTime}
				onChangeTime={updateMaxTime}
				onChangeWords={setMaxWords}
				onModeChange={handleModeChange}
			/>
			<div id="typing-container" className='w-10/12 max-h-80 overflow-y-auto m-4 p-8 rounded-lg bg-gray-200 shadow scroll scrollbar-none overscroll-auto scroll-smooth'>
				<UserInput inputRef={inputRef} handleKeyDown={handleKeydown} />
				<TextDisplay paragraph={paragraph} charIndex={charIndex} correctWrong={correctWrong} charRefs={charRefs}/>
			</div>
			<Stats mode={mode} timeLeft={timeLeft} mistakes={mistakes} accuracy={accuracy} WPM={WPM} CPM={CPM} reset={resetTyping}/>
		</div>
	)
}

export default TypingTest