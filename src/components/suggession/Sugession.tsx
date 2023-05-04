import React from 'react';
import styled from 'styled-components';

const SearchResult = styled.span`
  font-size: 1rem;
  padding: 10px 30px;
  font-weight: 500;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SelectRsult = styled(SearchResult)`
  background-color: rgba(0, 0, 0, 0.1);
`;

interface SuggetionType {
  name: string;
  keyword: string;

  index: number;
  keyIndex: number;
}

const Keyword = styled.span`
  font-weight: 900;
`;

export default function Suggession({ name, index, keyIndex, keyword }: SuggetionType) {
  if (keyIndex === index) {
    return (
      <SelectRsult className="selected suggession">
        <Keyword>{keyword}</Keyword>
        {name.replace(keyword, '')}
      </SelectRsult>
    );
  }

  return (
    <SearchResult className="suggession">
      <Keyword>{keyword}</Keyword>
      {name.replace(keyword, '')}
    </SearchResult>
  );
}
