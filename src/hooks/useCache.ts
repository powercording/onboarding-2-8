import getSearchWordApi from '../Instance/getSearchWordsAPI.ts';
import { RecomendType } from '../pages/Home.tsx';

export interface searchResultCacheType {
  value: RecomendType[];
  expiresAt: number;
}

let calledTime = 0;

export default function useCache() {
  const getData = async (url: string): Promise<RecomendType[] | null> => {
    const cacheData: searchResultCacheType = JSON.parse(sessionStorage.getItem(url) as string);

    if (cacheData && cacheData.expiresAt > Date.now()) {
      return cacheData.value;
    }

    if (!cacheData) {
      calledTime += 1;
      console.info('api 호출', calledTime);
      return getSearchWordApi.get(`?name=${url}`);
    }

    return null;
  };

  return getData;
}
