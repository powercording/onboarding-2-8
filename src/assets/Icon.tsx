import React from 'react';
import styled from 'styled-components';

const MiniButton = styled.div`
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(75px / 2);
  transform: translateY(-50%) translateX(25%);
  cursor: pointer;
`;

const Button = styled(MiniButton)`
  right: 15px;
  border-radius: 50%;
  background-color: RGB(2, 123, 232);
  transform: translateY(-50%);
`;

export default function Icon() {
  return (
    <Button>
      <svg
        viewBox="0 0 16 16"
        fill="white"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        width={25}
      >
        <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" />
      </svg>
    </Button>
  );
}

export function MiniIcon() {
  return (
    <MiniButton>
      <svg
        viewBox="0 0 16 16"
        fill="RGB(166, 175, 183)"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        width={20}
      >
        <path d="M6.56 0a6.56 6.56 0 015.255 10.49L16 14.674 14.675 16l-4.186-4.184A6.56 6.56 0 116.561 0zm0 1.875a4.686 4.686 0 100 9.372 4.686 4.686 0 000-9.372z" />
      </svg>
    </MiniButton>
  );
}
