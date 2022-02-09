import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { HashMap } from './scripts/genHash';
import type { HashDistMap } from './scripts/genDistMap';
import HashEntries from './HashEntries';

type Props = {
  hashMap: HashMap;
  distMap: HashDistMap;
}

type RouteParams = {
  hash: string;
}

type HashEntriesWithDist = {
  dist: number;
  hashEntries: React.ComponentProps<typeof HashEntries>['entries'];
};

const HashDetail: React.FC<Props> = ({hashMap, distMap}) => {
  const { hash } = useParams<RouteParams>();

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

  return <>
    <h1>{hash}</h1>
    <ul>
      {
        hashMap[hash].map(fn => (
          <li key={fn}>
            <a href={`/images/${fn}`}>
              <img height="100" src={`/images/${fn}`} alt={fn} />
            </a>
          </li>
        ))
      }
    </ul>

    <h1>Nearby hashes</h1>
    {
      nearbyHashEntries.map(({dist, hashEntries}) => (
        <div key={dist}>
          <h2>d={dist} (count={hashEntries.length})</h2>
          <HashEntries entries={hashEntries} />
        </div>
      ))
    }
  </>
};

export default HashDetail;
