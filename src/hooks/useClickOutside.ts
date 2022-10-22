import React, { useRef, useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const wrapperRef = useRef<T>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return wrapperRef;
}

export default useClickOutside;
