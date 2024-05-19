import { useCallback, useEffect, useRef, useState } from 'react'
import useParagraphGenerator from '../hooks/useParagraphGenerator';
import useTimer from '../hooks/useTimer';
import useTypingLogic from '../hooks/useTypingLogic';
import TypingTestFooterBar from './TypingTestFooterBar';
import TypingDisplayContainer from "./TypingDisplayContainer";
import TypingTestHeaderBar from './TypingTestHeaderBar';

type ModeType = "words" | "time" | "lorem";

const TypingTestApp = () => {
	const [mode, setMode] = useState<ModeType>("words");
	const [maxWords, setMaxWords] = useState(50);
	const [maxTime, setMaxTime] = useState(60_000);


	const { paragraph, generateNewParagraph } = useParagraphGenerator(mode, maxWords);
	const { timeLeft, startTimer, resetTimer, updateMaxTime } = useTimer(maxTime);
	const { charIndex, charRefs, mistakes, WPM, CPM, accuracy, correctWrong, handleKeydown, resetTyping } = useTypingLogic(paragraph, maxTime, timeLeft, startTimer);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const containerRef = useRef<HTMLDivElement |  null>(null);

	useEffect(() => {
		inputRef.current?.focus();
		generateNewParagraph();
		resetTimer();
	}, [maxWords, maxTime, mode]);

	const scrollToEnd = useCallback(() => {
		const container = containerRef.current;
		if (container) {
			const linesToScroll = Math.floor(charIndex / 180);
			const scrollHeight = linesToScroll * 72;
			container.scrollTop = scrollHeight;
		}
	}, [charIndex]);

	useEffect(() => {
		if (charIndex % 180 === 0) {
			scrollToEnd();
		}
	}, [charIndex, scrollToEnd]);

	const handleModeChange = (newMode: ModeType) => {
		setMode(newMode);
		if (newMode === "time") {
			setMaxWords(200);
			setMaxTime(60);
		} else {
			setMaxWords(50);
			setMaxTime(60_000);
		}

		generateNewParagraph();
		resetTyping();
		resetTimer();
	};

	const handleFocus = () => {
		inputRef.current?.focus();
	}

	const resetAll = () => {
		generateNewParagraph();
		resetTyping();
		resetTimer();
	}

	return (
		<div className='min-h-screen px-12 bg-slate-900 flex flex-col items-center justify-center font-noto-sans-mono tracking-wider' onClick={handleFocus}>
			<TypingTestHeaderBar mode={mode} maxWords={maxWords} maxTime={maxTime} onChangeTime={updateMaxTime} onChangeWords={setMaxWords} onModeChange={handleModeChange} />
			<TypingDisplayContainer containerRef={containerRef} inputRef={inputRef} handleKeydown={handleKeydown} paragraph={paragraph} charIndex={charIndex} correctWrong={correctWrong} charRefs={charRefs} />
			<TypingTestFooterBar mode={mode} timeLeft={timeLeft} mistakes={mistakes} accuracy={accuracy} WPM={WPM} CPM={CPM} reset={resetAll} />
		</div>
	)
}

export default TypingTestApp