import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { HashMap } from './scripts/genHash';
import type { HashDistMap } from './scripts/genDistMap';

type Props = {
  hashMap: HashMap;
  distMap: HashDistMap;
}

type RouteParams = {
  hash: string;
}

type NearbyHash = {
  dist: number;
  hash: string;
};

const HashDetail: React.FC<Props> = ({hashMap, distMap}) => {
  const { hash } = useParams<RouteParams>();

  /**
   * NearbyHash entries, sorted first by distance than by number of files in the hash
   */
  const nearbyHashes = useMemo<ReadonlyArray<NearbyHash>>(() => {
    if(!hash) return [];

    return Object.entries(distMap[hash])
      .reduce<NearbyHash[]>((agg, [dist, hashes]) => {
        return [...agg, ...hashes.map(hash => ({dist: +dist, hash}))];
      }, [])
      .sort((entry1, entry2) => {
        const diff = entry1.dist - entry2.dist;
        if(diff !== 0) return diff;

        const count1 = hashMap[entry1.hash].length;
        const count2 = hashMap[entry2.hash].length;
        return count2 - count1;
      });
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
      nearbyHashes.map(({hash, dist}) => (
        <div key={hash}>
          <Link to={`../${hash}`}>
            <h2>d={dist}, <code>{hash}</code></h2>
          </Link>
          <ul>
            {
              hashMap[hash].slice(0, 3).map(fn => (
                <li key={fn}>
                  <img height="100" src={`/images/${fn}`} alt={fn} />
                </li>
              ))
            }
          </ul>
        </div>
      ))
    }
  </>
};

export default HashDetail;
