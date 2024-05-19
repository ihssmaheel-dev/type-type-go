export const calculateWPM = (correctChars: number, totalTime: number): number => { 
    const wpm = Math.round((correctChars / 5 / totalTime) * 60);

    return wpm < 0 || wpm === Infinity ? 0 : wpm;
}

export const calculateCPM = (correctChars: number, totalTime: number): number => {
    const cpm = Math.round((correctChars * (60 / totalTime)));

    return cpm < 0 || cpm === Infinity ? 0 : cpm;
}