import { useState } from 'react';
import { RecomendType } from '../pages/Home.tsx';

interface DebounceType {
  callback: (url: string) => Promise<RecomendType[] | null>;
  url: string;
}

export default function useDebounce({ delay }: { delay: number }) {
  const [timer, setTimer] = useState<number | undefined>();

  return ({ callback, url }: DebounceType): Promise<RecomendType[] | null> => {
    clearTimeout(timer);

    return new Promise(resolve => {
      setTimer(
        setTimeout(() => {
          try {
            resolve(callback(url));
          } catch (e) {
            console.error(e);
          }
        }, delay),
      );
    });
  };
}
