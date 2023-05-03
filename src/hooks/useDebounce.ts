import { AxiosResponse } from 'axios';
import { RecomendType } from '../pages/Home.tsx';

interface DebounceType<T> {
  callback: (url: string) => Promise<AxiosResponse<T> | T[] | null>;
  url: string;
}

export default function useDebounce({ delay }: { delay: number }) {
  let timer: number;

  return ({ callback, url }: DebounceType<RecomendType>) => {
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
