import getSearchWordApi from '../Instance/getSearchWordsAPI.ts';
import { RecomendType } from '../pages/Home.tsx';

export interface searchResultCacheType {
  value: RecomendType[];
  expiresAt: number;
}

let calledTime = 0;

export default function useCache() {
  const getData = async (url: string) => {
    const key = new URLSearchParams(url).get('name') as string;
    const cacheData: searchResultCacheType = JSON.parse(sessionStorage.getItem(key) as string);

    if (cacheData && cacheData.expiresAt > Date.now()) {
      return cacheData.value;
    }

    if (!cacheData) {
      calledTime += 1;
      console.log('api 호출', calledTime);
      const fetchResult = await getSearchWordApi.get(url);
      return fetchResult;
    }

    return null;
  };

  return getData;
}
