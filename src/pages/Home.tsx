import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import useDebounce from '../hooks/useDebounce.ts';
import getSearchResult from '../Instance/getSearchWordsAPI.ts';
import useCache from '../hooks/useCache.ts';
import Dialog from '../components/Dialog.tsx';

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
`;

const Background = styled.div`
  background-color: RGB(202, 233, 255);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

const SearchBar = styled.input`
  width: 492px;
  height: 75px;
  border-radius: calc(75px / 2);
  border: none;
  padding: 12.5px;
  :focus {
    outline: 2px solid RGB(0, 123, 233);
  }
`;

// interface InitialRecomendType {
//   text: string;
// }

// const getDefaultRecomend = async () => {
//   if (sessionStorage.getItem('defaultRecomend')) {
//     return JSON.parse(sessionStorage.getItem('defaultRecomend') as string);
//   }

//   const defaultRecomend = await getSearchResult.get<InitialRecomendType[]>('/v1/search-keywords/');
//   sessionStorage.setItem('defaultRecomend', JSON.stringify(defaultRecomend));
//   return defaultRecomend;
// };

export interface RecomendType {
  name: string;
  id: number;
}

export default function Home() {
  // const [initialRecomend] = useState(() => getDefaultRecomend());
  const [recomend, setRecomend] = useState<RecomendType[] | AxiosResponse | null>();
  const modalRef = useRef<HTMLDialogElement>(null);
  const debounce = useDebounce({ delay: 1000 });
  const getCachedData = useCache();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchRecomendWords = await debounce({
      callback: getCachedData,
      url: `?name=${e.target.value}`,
    });

    if (searchRecomendWords?.length !== 0) setRecomend(searchRecomendWords);
  };

  const handleDialog = () => {
    modalRef.current?.showModal();
  };

  return (
    <Container>
      <Background>
        <div>
          <SearchBar onChange={handleSearch} onClick={handleDialog} onFocus={handleDialog} />
          <Dialog recomendtList={recomend as RecomendType[]} />
        </div>
      </Background>
    </Container>
  );
}
