import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce.ts';
import useCache from '../hooks/useCache.ts';
import Dialog from '../components/Dialog.tsx';
import Icon, { MiniIcon } from '../assets/Icon.tsx';

const Container = styled.div`
  width: 100dvw;
  height: 100dvh;
`;

const Background = styled.div`
  background-color: RGB(202, 233, 255);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  gap: 5rem;
`;

const SearchBar = styled.input`
  width: 492px;
  height: 75px;
  padding: 12.5px;
  border-radius: calc(75px / 2);
  padding-left: 65px;
  border: none;
  :focus {
    outline: 2px solid RGB(0, 123, 233);
  }
  font-size: 1rem;
  font-weight: bold;
`;

export interface RecomendType {
  name: string;
  id: number;
}

export default function Home() {
  const [recomend, setRecomend] = useState<RecomendType[] | null>();
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useDebounce({ delay: 600 });
  const getCahceData = useCache();

  const handleInputFocus = () => {
    setFocus(prev => !prev);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWords = await debounce({
      callback: getCahceData,
      url: `${e.target.value}`,
    });
    setRecomend(() => searchWords);
  };

  const handleEnter = () => {
    const recentItem = JSON.parse(sessionStorage.getItem('recent-search') as string);
    if (!recentItem) {
      sessionStorage.setItem('recent-search', JSON.stringify([inputRef.current?.value]));
    }
    if (recentItem) {
      sessionStorage.setItem(
        'recent-search',
        JSON.stringify(Array.from(new Set([...recentItem, inputRef.current?.value]))),
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  };

  return (
    <Container>
      <Background>
        <div>
          <h1>
            국내 모든 임상 검색하고
            <br />
            온라인으로 참여하기
          </h1>
        </div>
        <div style={{ position: 'relative' }}>
          <MiniIcon />
          <SearchBar
            ref={inputRef}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputFocus}
          />
          <Icon />
          <Dialog
            recomendtList={recomend as RecomendType[]}
            keyword={`${inputRef.current?.value}`}
            focus={focus}
          />
        </div>
      </Background>
    </Container>
  );
}
