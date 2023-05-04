import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce.ts';
import useCache from '../hooks/useCache.ts';
import Dialog from '../components/Dialog.tsx';
import Icon, { MiniIcon } from '../assets/Icon.tsx';
import Suggession from '../components/suggession/Sugession.tsx';
import HeadLine from '../components/HeadLine/HeadLine.tsx';

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
  const [keyIndex, setKeyIndex] = useState(-1);
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounce = useDebounce({ delay: 600 });
  const getCahceData = useCache();

  const handleInputFocus = () => {
    setFocus(true);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchWords = await debounce({
      callback: getCahceData,
      url: `${e.target.value}`,
    });
    setRecomend(() => searchWords);
  };

  const handleSearch = () => {
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

  const handleArrowUp = () => {
    if (recomend && keyIndex > 0) {
      setKeyIndex(prev => prev - 1);
    }
  };

  const handleArrowDown = () => {
    if (recomend && keyIndex < recomend.length - 1) {
      setKeyIndex(prev => prev + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Enter':
        handleSearch();
        break;
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'ArrowDown':
        handleArrowDown();
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <Background>
        <HeadLine />
        <div style={{ position: 'relative' }}>
          <MiniIcon />
          <SearchBar
            ref={inputRef}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            // onClick={handleInputFocus}
          />
          <Icon />
          <Dialog keyword={`${inputRef.current?.value}`} focus={focus}>
            {recomend?.map((list: RecomendType, index) => (
              <Suggession
                key={list.id}
                keyIndex={keyIndex}
                index={index}
                name={list.name}
                keyword={`${inputRef.current?.value}`}
              />
            ))}
          </Dialog>
        </div>
      </Background>
    </Container>
  );
}
