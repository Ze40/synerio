import { useRef } from "react";

export const useTimeout = () => {
  const timeRef = useRef<null | number>(null);

  const timeout = (callback: () => void, delay: number) => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = window.setTimeout(callback, delay);
  };

  return timeout;
};
