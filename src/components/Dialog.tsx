import React from 'react';
import { RecomendType } from '../pages/Home.tsx';

interface DialogType {
  recomendtList: RecomendType[];
}

export default function Dialog({ recomendtList }: DialogType) {
  const recomendItemBoxRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log(e.key);
    }
  };

  React.useEffect(() => {
    if (recomendItemBoxRef.current) {
      recomendItemBoxRef.current.addEventListener('keydown', handleKeyDown);
    }

    return recomendItemBoxRef.current?.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div ref={recomendItemBoxRef}>
      {recomendtList?.map((recomend: RecomendType) => {
        return <div key={recomend.id}>{recomend.name}</div>;
      })}
    </div>
  );
}
