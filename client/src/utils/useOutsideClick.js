import { useEffect, useRef } from "react";

export const useOutsideClick = (handler, extraRef = {}) => {
  const ref = useRef();

  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler?.();
      }
      if (extraRef?.current && !extraRef?.current?.contains(e.target)) {
        handler?.();
      }
    };

    document.addEventListener("click", listener, true);
    return () => document.removeEventListener("click", listener, true);
  }, [handler, extraRef]);

  return ref;
};
