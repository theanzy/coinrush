import { useEffect, useState } from 'react';

const useMediaQuery = (mediaQuery: string) => {
  const [match, setMatch] = useState<boolean>(false);
  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatch(e.matches);
    const mediaQueryList = window.matchMedia(mediaQuery);
    setMatch(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handler);
    return () => {
      mediaQueryList.removeEventListener('change', handler);
    };
  }, []);
  return match;
};

export default useMediaQuery;
