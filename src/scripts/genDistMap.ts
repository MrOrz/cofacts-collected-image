import path from 'path';
import fs from 'fs';
import { SingleBar } from 'cli-progress';

import { BITS } from '../util';
import type { HashMap } from './genHash';

// % of bit differences that can be toleranted (to consider as near-by).
// Between 0 ~ 1.
const NEARBY_TOLERANCE = 0.25;

// Keep nearby hash to around this size.
// (May be more hash than this number if there are many hash with the same distances)
//
const NEARBY_HASH_COUNT = 16;

const DATA_OUT = './data';

const XOR_DIST = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4] as const;

/**
 * Calculate the hamming distance for two hashes in hex format
 *
 * Copy-pasted from https://github.com/commonsmachinery/blockhash-js/blob/master/index.js#L10-L27
 *  */
function hammingDistance(hash1: string, hash2: string): number {
  let d = 0;
  let i;

  if (hash1.length !== hash2.length) {
      throw new Error("Can't compare hashes with different length");
  }

  for (i = 0; i < hash1.length; i++) {
      let n1 = parseInt(hash1[i], 16);
      let n2 = parseInt(hash2[i], 16);
      d += XOR_DIST[n1 ^ n2];
  }
  return d;
};

/**
 * A map of hash to other hashes, keyed by the distances between them.
 */
export type HashDistMap = {[hash: string]: {[dist: number]: string[]}};

/**
 * @param hashMap - generated by genHash.ts
 * @param threshold - Max hamming distance for the hash to consider "nearby"
 * @returns A map of hash to other nearby hash, keyed by the distance in between.
 */
function getNearbyHashes(hashMap: HashMap, threshold: number = Infinity): HashDistMap {
  const hashes = Object.keys(hashMap);
  const hashDistMap: HashDistMap = {};
  const bar = new SingleBar({ stopOnComplete: true });
  bar.start(hashes.length, 0);

  for(const [currentIdx, currentHash] of hashes.slice(0, -1).entries()) {
    for(let idx = currentIdx + 1; idx < hashes.length; idx +=1) {
      const hash = hashes[idx];
      const dist = hammingDistance(currentHash, hash);

      // Skip if too far away
      if(dist > threshold) continue;

      // distance works currentHash <--> hash, so we register for both currentHash & hash
      hashDistMap[currentHash] ??= {};
      hashDistMap[currentHash][dist] ??= [];
      hashDistMap[currentHash][dist].push(hash);
      hashDistMap[hash] ??= {};
      hashDistMap[hash][dist] ??= [];
      hashDistMap[hash][dist].push(currentHash);
    }

    if(hashDistMap[currentHash]) {
      // Only keep entries with smaller distances.
      //
      const allDists = hashDistMap[currentHash];
      const distances = Object.keys(allDists).map(d => +d);
      distances.sort();

      // Re-populate hashDistMap[currentHash] starting with lower distances
      //
      hashDistMap[currentHash] = distances.reduce<{
        hashCount: number; map: HashDistMap[string]
      }>((agg, d) => {
        if(agg.hashCount >= NEARBY_HASH_COUNT) return agg;

        agg.map[d] = allDists[d];
        agg.hashCount += allDists[d].length;
        return agg;
      }, {map: {}, hashCount: 0}).map;
    }

    bar.increment();
  }
  bar.stop();
  return hashDistMap;
}

function main() {
  for(const bits of BITS) {
    console.log(`Processing for bits=${bits}`)
    const hashMap = JSON.parse(fs.readFileSync(`./data/hash${bits}.json`, { encoding: 'utf8' }));
    const nearbyHashes = getNearbyHashes(hashMap, Math.round(bits * bits * NEARBY_TOLERANCE));

    // Avoid OOM
    const entries = Object.entries(nearbyHashes).map(([key, value]) => `"${key}": ${JSON.stringify(value)}`);
    fs.writeFileSync(
      path.join(DATA_OUT, `dist${bits}.json`),
      `{\n${entries.join(',\n')}\n}`
    );
  }
}

main();
