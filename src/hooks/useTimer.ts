import { useEffect, useState } from "react"

const useTimer = (initialTime: number) => {
	const [timeLeft, setTimeLeft] = useState(initialTime);

	const startTimer = (): void => {
		setTimeLeft(initialTime);
	}

	const resetTimer = (): void => {
		setTimeLeft(initialTime);
	}

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if(timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [timeLeft]);

	const updateMaxTime = (time: number): void => {
		setTimeLeft(time);
	}

	return { timeLeft, startTimer, resetTimer, updateMaxTime };
}

export default useTimer;