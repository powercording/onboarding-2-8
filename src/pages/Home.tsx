import React, { useState } from 'react';
import styled from 'styled-components';
import { AxiosResponse } from 'axios';
import useDebounce from '../hooks/useDebounce.ts';
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
  const [recomend, setRecomend] = useState<RecomendType[] | null>();
  const debounce = useDebounce({ delay: 1000 });
  const getCahceData = useCache();

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWords = await debounce({
      callback: getCahceData,
      url: `${e.target.value}`,
    });

    if (searchWords && searchWords?.length !== 0) setRecomend(searchWords);
  };

  return (
    <Container>
      <Background>
        <div>
          <SearchBar onChange={handleSearchChange} />
          <Dialog recomendtList={recomend as RecomendType[]} />
        </div>
      </Background>
    </Container>
  );
}
