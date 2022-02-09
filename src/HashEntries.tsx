import React from 'react';
import { styled } from '@mui/system';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

type Props = {
  entries: ReadonlyArray<{
    hash: string;
    url: string;
    fileNames: ReadonlyArray<string>;
  }>;
};

export const Entries = styled('ul')({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '16px',
  margin: 0,
  padding: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  listStyle: 'none'
});

const LAYOUT = [
  // 0 images
  [],
  // 1 images
  [{rows: 2, cols: 3}],
  // 2 images
  [{rows: 2, cols: 2}, {rows: 2, cols: 1}],
  // 3 images
  [{rows: 2, cols: 1}, {rows: 1, cols: 2}, {rows: 1, cols: 2}],
  // 4 images
  [{rows: 2, cols: 1}, {rows: 1, cols: 2}, {rows: 1, cols: 1}, {rows: 1, cols: 1}],
] as const

const HashEntries: React.FC<Props> = ({entries}) => {
  return (
    <Entries>
      {
        entries.map(({ hash, fileNames, url }) => {
          const fileNamesToShow = fileNames.slice(0, 4);
          const layout = LAYOUT[fileNamesToShow.length];
          return (
            <li key={hash}>
              <Link to={url}>
                <code>{hash}</code> ({fileNames.length})
              </Link>
              <ImageList variant="quilted" cols={3} rowHeight={100} sx={{width: 300}}>
                {
                  fileNamesToShow.map((fn, idx) =>
                    <ImageListItem key={fn} {...layout[idx]}>
                      <img src={`/images/${fn}`} alt={fn} />
                    </ImageListItem>
                  )
                }
              </ImageList>
            </li>
          );
        })
      }
    </Entries>
  )
}

export default HashEntries