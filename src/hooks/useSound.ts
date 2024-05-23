import { useState, useCallback, useRef } from "react";
import { SoundKey } from "../types";

interface UseSoundReturn {
    play: (key: SoundKey) => void;
    toggleSound: () => void;
    isSoundEnabled: boolean;
}

const useSound = (): UseSoundReturn => {
    const audioMap = useRef<Record<SoundKey, HTMLAudioElement | HTMLAudioElement[]>>({
        key: new Audio("sounds/typing-sound-2.mp3"),
        space: new Audio("sounds/spacebar-sound.mp3"),
        error: new Audio("sounds/error-beep.mp3"),
    });

    const [isSoundEnabled, setIsSoundEnabled] = useState(true);

    const play = useCallback((key: SoundKey) => {
        if (isSoundEnabled) {
            const audio = audioMap.current[key];
            if (Array.isArray(audio)) {
                const randomIndex = Math.floor(Math.random() * audio.length);
                const randomAudio = audio[randomIndex];
                randomAudio.currentTime = 0;
                randomAudio.play();
            } else {
                audio.currentTime = 0;
                audio.play();
            }
        }
    }, [isSoundEnabled]);

    const toggleSound = useCallback(() => setIsSoundEnabled(prev => !prev), []);

    return { play, toggleSound, isSoundEnabled };
};

export default useSound;
