import { useCallback, useState, useEffect, Dispatch, SetStateAction } from 'react';

function useRoveFocus(size: number): [number, Dispatch<SetStateAction<number>>] {
  const [currentFocus, setCurrentFocus] = useState(0);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode === 40) {
        // Down arrow
        e.preventDefault();
        if (currentFocus > size - 1) {
          setCurrentFocus(size - 1);
          return;
        }
        setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1);
      } else if (e.keyCode === 38) {
        // Up arrow
        e.preventDefault();
        if (currentFocus < 0) {
          setCurrentFocus(0);
          return;
        }
        setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1);
      }
    },
    [size, currentFocus, setCurrentFocus],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return [currentFocus, setCurrentFocus];
}

export default useRoveFocus;
