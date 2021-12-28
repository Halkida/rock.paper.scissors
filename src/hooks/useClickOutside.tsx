import { useState, useEffect, useRef } from 'react';

export const useClickOutside = (initialIsVisible: boolean, onClickOutside: () => void) => {
    const [isClickOutside, setIsClickOutside] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current?.contains(event.target as HTMLElement)) {
          setIsClickOutside(!isClickOutside);
          onClickOutside && onClickOutside();
        }
    };

    // TODO добавить нажатие на клавишиa

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    return { ref, isClickOutside, setIsClickOutside };
}