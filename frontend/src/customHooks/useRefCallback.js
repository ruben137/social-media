import { useCallback, useRef } from "react";

export function useHookWithRefCallback(setSkip) {
  const ref = useRef(null);
  const handleObserver = useCallback((entries) => {

    const target = entries[0];

    if (target.isIntersecting) {

      setSkip((prev) => prev + 7);
    }
  }, []);

  const setRef = useCallback((node) => {
    if (node) {
      ref.current = node;
    
      const option = {
        root: null,
        rootMargin: "20px",
        threshold: 0,
      };
      const observer = new IntersectionObserver(handleObserver, option);
      if (ref.current) observer.observe(ref.current);
    }
  }, []);

  return [setRef];
}