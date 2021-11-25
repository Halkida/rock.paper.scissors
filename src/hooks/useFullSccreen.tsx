import { useState } from 'react';

export const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const checkFullScreen = (): boolean => {
    return Boolean(document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement);
  };

  const requestFullScreen = (element: HTMLElement) => {
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
  };

  const exitFullScreen = () => {
    if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }

    setIsFullScreen(false);
  };

  const toggleFullScreen = (element: HTMLElement = document.body) => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      requestFullScreen(element);
    }
  };

  return {
    isFullScreen,
    requestFullScreen,
    exitFullScreen,
    toggleFullScreen,
    checkFullScreen
  };
};