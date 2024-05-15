export const calculateWPM = (correctChars: number, totalTime: number): number => { 
    const wpm = Math.round((correctChars / 5 / totalTime) * 60);
    return wpm < 0 || isNaN(wpm) ? 0 : wpm;
}

export const calculateCPM = (correctChars: number, totalTime: number): number => {
    const cpm = Math.round((correctChars * (60 / totalTime)));
    return cpm < 0 || isNaN(cpm) ? 0 : cpm;
}