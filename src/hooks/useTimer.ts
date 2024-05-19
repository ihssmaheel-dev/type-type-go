import { useEffect, useState } from "react"

const useTimer = (initialTime: number) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if(isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isActive, timeLeft]);

	const startTimer = () => setIsActive(true);
	const stopTimer = () => setIsActive(false);
	const resetTimer = () => {
		stopTimer();
		setTimeLeft(initialTime);
	}

	const updateMaxTime = (newTime: number): void => {
		setTimeLeft(newTime);
		stopTimer();
	}

	return { timeLeft, startTimer, resetTimer, updateMaxTime };
}

export default useTimer;