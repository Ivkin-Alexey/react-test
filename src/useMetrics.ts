import React, { useState, useEffect } from 'react';

const useMetrics = (ref: React.RefObject<HTMLElement>) => {

    interface IPosition {
        scrollHeight: number,
        clientHeight: number,
        scrollTop: number,
        scrollBottom: number,
    }

  const [metrics, setMetrics] = useState<IPosition>({scrollHeight: 0, clientHeight: 0, scrollTop: 0, scrollBottom: 0});

  useEffect(() => {

    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        setMetrics(() => ({scrollHeight, clientHeight, scrollTop, scrollBottom}));
      }
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref]);

  return metrics;
};

export default useMetrics;
