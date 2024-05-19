export const calculateWPM = (correctChars: number, totalTime: number): number => { 
    const wpm = Math.round((correctChars / 5 / totalTime) * 60);

    return wpm < 0 || wpm === Infinity ? 0 : wpm;
}

export const calculateCPM = (correctChars: number, totalTime: number): number => {
    const cpm = Math.round((correctChars * (60 / totalTime)));

    return cpm < 0 || cpm === Infinity ? 0 : cpm;
}

export const calculateAccuracy = (charIndex : number, errors : number, typedChar: string, currentChar: string | null | undefined ): number => {
    const correctChars = charIndex - errors + (typedChar === currentChar ? 1 : 0);
    const totalTypedChars = charIndex + 1;

    return parseFloat(((correctChars / totalTypedChars) * 100).toFixed(2));
}