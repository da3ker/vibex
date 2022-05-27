import { useEffect, useRef } from "react";

export const useMouseOut = (handler) => {
  const domRef = useRef();

  useEffect(() => {
    const toggleHandler = (event) => {
      if (!domRef.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mouseout", toggleHandler);
    document.addEventListener("mousedown", toggleHandler);

    return () => {
      document.removeEventListener("mouseout", toggleHandler);
      document.removeEventListener("mousedown", toggleHandler);
    };
  });
  return domRef;
};
