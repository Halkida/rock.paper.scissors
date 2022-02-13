import { useState, useEffect, useCallback, useRef } from 'react';

const URL = '/static/audio/theme.mp3';

type RPSAudioOptions = {
  parent: Nullable<HTMLDivElement>,
  isLoop?: boolean,
};

export const useAudio = ({
  parent,
  isLoop = false,
}: RPSAudioOptions) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio(URL));
  const [canPlay, setCanPlay] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (audioElement.current && parent) {
      audioElement.current.loop = isLoop;
      parent.appendChild(audioElement.current);
      audioElement.current?.addEventListener('canplaythrough', () => {
        setCanPlay(true);
      });
    }
  }, [audioElement, setCanPlay, parent]);

  const handleAudioPlay = useCallback(() => {
    audioElement.current.play();
    setIsPlaying(true);
  }, [audioElement, setIsPlaying]);

  const handleAudioPause = useCallback(() => {
    audioElement.current.pause();
    setIsPlaying(false);
  }, [audioElement, setIsPlaying]);

  return {
    isPlaying,
    canPlay,
    play: handleAudioPlay,
    pause: handleAudioPause,
  };
};
