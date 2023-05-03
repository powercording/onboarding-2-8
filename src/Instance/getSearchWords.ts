import axios, { AxiosResponse } from 'axios';

const getSearchResult = axios.create({
  baseURL: '/api',
});

getSearchResult.interceptors.response.use((response: AxiosResponse) => {
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Error');
});

export default getSearchResult;
