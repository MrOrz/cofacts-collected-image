import React, { useMemo } from 'react';
import type { HashMap } from './scripts/genHash';

type Props = {
  hashMap: HashMap;
};

const HashList: React.FC<Props> = ({hashMap}) => {
  const hashEntries = useMemo(() => {
    return Object.entries(hashMap).sort(([, fns1], [, fns2]) => fns2.length - fns1.length)
  }, [hashMap]);

  return <ul className="">
    {hashEntries.map(([hash, fileNames]) => (
      <li key={hash}>
        <code>{hash}</code> ({fileNames.length})
        <ul>
          {
            fileNames.slice(0, 3).map(fn => (
              <li key={fn}><img height="100" src={`/images/${fn}`} alt={fn} /></li>
            ))
          }
        </ul>
      </li>
    ))}
  </ul>
}

export default HashList;
