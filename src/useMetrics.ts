import { useState, useEffect } from 'react';

const useMetrics = (ref: React.RefObject<HTMLElement>) => {

    interface IPosition {
        scrollHeight: number | null,
        clientHeight: number | null,
        scrollTop: number | null, 
        scrollBottom: number | null, 
    }

  const [metrics, setMetrics] = useState<IPosition>({scrollHeight: null, clientHeight: null, scrollTop: null, scrollBottom: null});

  useEffect(() => {

    const handleScroll = () => {
      if (ref.current) {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        setMetrics({scrollHeight, clientHeight, scrollTop, scrollBottom});
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
