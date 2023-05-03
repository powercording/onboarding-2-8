import React from 'react';
import styled from 'styled-components';
import { RecomendType } from '../pages/Home.tsx';

interface DialogType {
  recomendtList: RecomendType[];
  keyword: string;
  focus: boolean;
}

const Container = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px 0px;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 550px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.1);
`;

const Placeholder = styled.span`
  color: gray;
  font-size: 12px;
  padding: 0px 30px;
`;

const Recent = styled.span`
  font-size: 1rem;
  padding: 10px 30px;
  font-weight: bold;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NoSearch = styled(Recent)``;
const SearchResult = styled(Recent)``;

export default function Dialog({ recomendtList, keyword, focus }: DialogType) {
  const recentSearch = JSON.parse(sessionStorage.getItem('recent-search') as string);

  if (!focus) {
    return null;
  }

  if (keyword) {
    return (
      <Container>
        <Recent>{keyword}</Recent>
        {recomendtList && <Placeholder>추천 검색어</Placeholder>}
        {recomendtList?.map((recomend: RecomendType) => {
          return <SearchResult key={recomend.id}>{recomend.name}</SearchResult>;
        })}
      </Container>
    );
  }

  return (
    <Container>
      <Placeholder>최근 검색어</Placeholder>
      {recentSearch?.map((text: string) => {
        return <Recent key={text}>{text}</Recent>;
      }) || <NoSearch>검색어 없음</NoSearch>}
    </Container>
  );
}
