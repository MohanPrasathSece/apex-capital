import { useRef, useEffect } from "react";

export function useHoverScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const scrollState = useRef({ speed: 0, active: false });

  useEffect(() => {
    let animationFrameId: number;

    const scrollLoop = () => {
      if (ref.current && scrollState.current.active && scrollState.current.speed !== 0) {
        ref.current.scrollTop += scrollState.current.speed;
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<T>) => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    if (!ref.current) return;
    const { clientY } = e;
    const { top, bottom } = ref.current.getBoundingClientRect();
    const threshold = 40;

    if (clientY < top + threshold) {
      scrollState.current = { active: true, speed: -4 };
    } else if (clientY > bottom - threshold) {
      scrollState.current = { active: true, speed: 4 };
    } else {
      scrollState.current = { active: false, speed: 0 };
    }
  };

  const handleMouseLeave = () => {
    scrollState.current = { active: false, speed: 0 };
  };

  const handleTouchStart = () => {
    scrollState.current = { active: false, speed: 0 };
  };

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, onTouchStart: handleTouchStart };
}
