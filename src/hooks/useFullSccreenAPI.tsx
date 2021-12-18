import { useCallback, useState } from 'react';

export const useFullScreenAPI = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const requestFullScreen = useCallback((element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }

    setIsFullScreen(true);
  }, []);

  const exitFullScreen = useCallback(() => {
    if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    setIsFullScreen(false);
  }, []);

  const toggleFullScreen = useCallback((element: HTMLElement = document.body) => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      requestFullScreen(element);
    }
  }, [isFullScreen]);

  return {
    isFullScreen,
    toggleFullScreen
  };
};