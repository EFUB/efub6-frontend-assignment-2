import { useEffect, useState } from "react";

export const useIntersectionObserver = (
  onIntersect: () => void,
  enabled: boolean
) => {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.2, rootMargin: "120px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [target, enabled, onIntersect]);

  return setTarget;
};
