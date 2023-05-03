import axios, { AxiosResponse } from 'axios';
import CONST from './CONST.ts';

function clearSessionStorage() {
  // eslint-disable-next-line , no-plusplus
  for (let key = 0; key < sessionStorage.length; key++) {
    const keyName = sessionStorage.key(key);
    const cachedKeyWord = JSON.parse(sessionStorage.getItem(`${keyName}`) as string);
    if (cachedKeyWord.expiresAt < Date.now()) {
      sessionStorage.removeItem(`${keyName}`);
    }
  }
}
setInterval(clearSessionStorage, CONST.SEC * CONST.MIN);

const getSearchResult = axios.create({
  baseURL: CONST.BASEURL,
});

getSearchResult.interceptors.response.use((response: AxiosResponse) => {
  if (response.status !== 200) {
    throw new Error(CONST.ERROR);
  }
  if (response.data.length === 0) {
    return console.info(CONST.INVALID);
  }

  const url = new URLSearchParams(response.config.url as string);
  const key = url.get(CONST.PARAMETER) as string;

  sessionStorage.setItem(
    key,
    JSON.stringify({
      value: response.data,
      expiresAt: Date.now() + CONST.SEC * CONST.MIN * 10,
    }),
  );

  return response.data;
});

export default getSearchResult;
