import { useState, useRef, useEffect } from 'react';

export const useNearScreen = ({ rootMargin = '15px', externalRef } = {}) => {
  const [isNear, setIsNear] = useState(false);
  const el = useRef(null);
  useEffect( () => {

        let observer;
        const element = externalRef ? externalRef.current : el.current;

        Promise.resolve(
        typeof window.IntersectionObserver !== "undefined"
            ? window.IntersectionObserver
            : import("intersection-observer")
        ).then(() => {
            const onIntersect = (entries, observer) => {
                const { isIntersecting } = entries[0];

                if (isIntersecting) {
                    setIsNear(true);
                    observer.disconnect();
                }
            };

            observer = new window.IntersectionObserver(onIntersect, { rootMargin });
            element && observer.observe(element);
        });

        return () => observer && observer.disconnect();
    },
    [el, rootMargin, externalRef]
  );

  return [isNear, el];
};