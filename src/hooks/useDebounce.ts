import { AxiosResponse } from 'axios';
import { RecomendType } from '../pages/Home.tsx';

interface DebounceType {
  callback: (url: string) => Promise<RecomendType[] | null>;
  url: string;
}

export default function useDebounce({ delay }: { delay: number }) {
  let timer: number;

  return ({ callback, url }: DebounceType): Promise<RecomendType[] | null> => {
    clearTimeout(timer);

    return new Promise(resolve => {
      timer = setTimeout(() => {
        try {
          resolve(callback(url));
        } catch (e) {
          console.error(e);
        }
      }, delay);
    });
  };
}
