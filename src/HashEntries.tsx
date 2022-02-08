import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

type Props = {
  entries: ReadonlyArray<{
    hash: string;
    url: string;
    fileNames: ReadonlyArray<string>;
  }>;
};

const HashEntries: React.FC<Props> = ({entries}) => {
  return (
    <ul>
      {
        entries.map(({hash, fileNames, url}) => (
          <li key={hash}>
            <Link to={url}>
              <code>{hash}</code> ({fileNames.length})
            </Link>
            <ul>
              {
                fileNames.slice(0, 3).map(fn => (
                  <li key={fn}><img height="100" src={`/images/${fn}`} alt={fn} /></li>
                ))
              }
            </ul>
          </li>
        ))
      }
    </ul>
  )
}

export default HashEntries