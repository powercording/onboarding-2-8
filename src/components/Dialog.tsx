import React from 'react';
import styled from 'styled-components';

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

const SearchResult = styled.span`
  font-size: 1rem;
  padding: 10px 30px;
  font-weight: 500;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Recent = styled(SearchResult)`
  font-size: 1rem;
  padding: 10px 30px;
  font-weight: 900;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NoSearch = styled(Recent)`
  :hover {
    background-color: transparent;
  }
`;

interface DialogType {
  keyword: string;
  focus: boolean;
  children: React.ReactNode;
}

export default function Dialog({ keyword, focus, children }: DialogType) {
  const recentSearch = JSON.parse(sessionStorage.getItem('recent-search') as string);

  // useEffect

  if (!focus) {
    return null;
  }

  if (keyword) {
    return (
      <Container>
        <Recent>{keyword}</Recent>
        {children && <Placeholder>추천 검색어</Placeholder>}
        {children}
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
