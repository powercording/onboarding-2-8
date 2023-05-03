import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import CONST from './Instance/CONST.ts';

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
