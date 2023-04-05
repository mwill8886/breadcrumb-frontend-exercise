import React, { useLayoutEffect } from 'react';

/**
 * Measures the width of an element in the DOM (to its ceiling at the next integer).
 *
 * @param ref ref for the element to measure.
 * @param setWidth function called when the width changes. Note this must have a consistent
 * reference!
 */
export function useElementWidth<T extends HTMLElement>(
  ref: React.RefObject<T>,
  setWidth: (width: number) => void
) {
  useLayoutEffect(() => {
    if (ref.current === null) return;

    // initialize parent width
    setWidth(Math.ceil(ref.current.clientWidth));

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(Math.ceil(entry.contentRect.width));
      }
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, setWidth]);
}
