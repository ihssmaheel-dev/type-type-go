import { useEffect, useState } from "react"

const useSound = () => {
    const [keyAudios] = useState([new Audio("sounds/typing-sound-1.mp3"), new Audio("sounds/typing-sound-2.mp3")]);
    const [spaceAudio] = useState(new Audio("sounds/spacebar-sound.mp3"));
    const [errorAudio] = useState(new Audio("sounds/error-beep.mp3"));
    const [isPlaying, setIsplaying] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);

    const play = (key: string) => {
        if(isEnabled) {
            if(key === "space") {
                spaceAudio.currentTime = 0;
                spaceAudio.play();
            } else if (key === "error") {
                errorAudio.currentTime = 0;
                errorAudio.play();
            } else if(key === "key") {
                const randomIndex = Math.floor(Math.random() * keyAudios.length);
                const keyAudio = keyAudios[randomIndex];
                keyAudio.currentTime = 0;
                keyAudio.play();
            }
        }
    }

    const toggleSound = () => setIsEnabled(!isEnabled);

    useEffect(() => {
        const handleEnded = () => setIsplaying(false);

        keyAudios.forEach(keyAudio => keyAudio.addEventListener("ended", handleEnded));
        spaceAudio.addEventListener('ended', handleEnded);
        errorAudio.addEventListener('ended', handleEnded);

        return () => {
            keyAudios.forEach(keyAudio => keyAudio.removeEventListener("ended", handleEnded));
            spaceAudio.removeEventListener('ended', handleEnded);
            errorAudio.removeEventListener('ended', handleEnded);
        }
    }, [keyAudios, spaceAudio, errorAudio]);

    return { play, toggleSound, isEnabled };
}

export default useSound;