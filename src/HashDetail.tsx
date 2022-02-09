import React, { useMemo, useState } from 'react';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';

import { useParams } from 'react-router-dom';
import type { HashMap } from './scripts/genHash';
import type { HashDistMap } from './scripts/genDistMap';
import HashEntries from './HashEntries';

type Props = {
  hashMap: HashMap;
  distMap: HashDistMap;
}

const PAGE_SIZE = 500;

type RouteParams = {
  hash: string;
}

type HashEntriesWithDist = {
  dist: number;
  hashEntries: React.ComponentProps<typeof HashEntries>['entries'];
};

export const ImageWall = styled('ul')({
  display: 'flex',
  flexFlow: 'row wrap',
  gap: '8px',
  margin: 0,
  padding: 0,
  alignItems: 'center',
  justifyContent: 'space-between',
  listStyle: 'none'
});

const HashDetail: React.FC<Props> = ({hashMap, distMap}) => {
  const { hash } = useParams<RouteParams>();
  const [page, setPage] = useState(1);

  /**
   * NearbyHash entries, sorted first by distance than by number of files in the hash
   */
  const nearbyHashEntries = useMemo<ReadonlyArray<HashEntriesWithDist>>(() => {
    if(!hash) return [];

    return Object.entries(distMap[hash])
      .reduce<HashEntriesWithDist[]>((agg, [dist, hashes]) => [
          ...agg,
          {
            dist: +dist,
            hashEntries: hashes.map(hash => ({
              hash, url: `../${hash}`, fileNames: hashMap[hash]
            })).sort((hash1, hash2) =>
              hash2.fileNames.length - hash1.fileNames.length
            )
          }
        ], [])
      .sort((entry1, entry2) => entry1.dist - entry2.dist);
  }, [hash, distMap, hashMap])

  if(!hash) {
    return <p><code>hash</code> is not provided in URL.</p>
  }

  const handlePageChange = (e: unknown, value: number) => {
    setPage(value);
  }

  const fileNames = hashMap[hash];

  const paginationElem = (
    <Pagination
      sx={{my: 1}}
      count={Math.ceil(fileNames.length / PAGE_SIZE)}
      page={page}
      onChange={handlePageChange}
    />
  );

  return <Container maxWidth={false}>
    <h1>{hash} ({fileNames.length} images)</h1>

    {paginationElem}
    <ImageWall>
      {
        fileNames.slice((page-1) * PAGE_SIZE, page * PAGE_SIZE).map(fn => (
          <li key={fn}>
            <a href={`/images/${fn}`}>
              <img height="160" src={`/images/${fn}`} alt={fn} />
            </a>
          </li>
        ))
      }
    </ImageWall>
    {paginationElem}

    <h1>Nearby hashes</h1>
    {
      nearbyHashEntries.map(({dist, hashEntries}) => (
        <div key={dist}>
          <h2>d={dist} (count={hashEntries.length})</h2>
          <HashEntries entries={hashEntries} />
        </div>
      ))
    }
  </Container>
};

export default HashDetail;
