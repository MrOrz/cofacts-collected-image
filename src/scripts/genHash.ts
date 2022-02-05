/**
 * Writes hash4.json, hash8.json & hash16.json, which contains a single map with
 * - perceptual hash being key
 * - filenames with that hash being values
 */

import fs from 'fs';
import path from 'path';
import { imageHash } from 'image-hash';
import { SingleBar } from 'cli-progress';

const DATA_IMAGE_DIR = './data/images';
const DATA_OUT = './data';

/**
 * Maps hash to list of file names
 */
export type HashMap = {[hash: string]: string[]};

function getHash(fileName: string, bits: number): Promise<string> {
  return new Promise((resolve, reject) => {
    imageHash(path.join(DATA_IMAGE_DIR, fileName), bits, true, (err: unknown, data: string | undefined) => {
      if(err) return reject(`${fileName}: ${err}`);
      if(!data) return reject(new Error(`No hash generated; fileName=${fileName}, bits=${bits}`));
      resolve(data);
    })
  });
}

async function genHashMap(bits: number): Promise<HashMap> {
  /**
   * Map hash to files
   */
  console.log(`Processing for bits=${bits}`)
  const hashMap: HashMap = {};
  const files = fs.readdirSync(path.join(DATA_IMAGE_DIR), {
    withFileTypes: true
  }).filter(dirent => dirent.isFile());

  const bar = new SingleBar({ stopOnComplete: true });
  bar.start(files.length, 0);

  for(const file of files) {
    let hash;
    try {
      hash = await getHash(file.name, bits);
    } catch(e) {
      // May be corrupted JPEG, skip
      console.error('\n', e);
      continue;
    }
    hashMap[hash] ??= [];
    hashMap[hash].push(file.name);
    bar.increment();
  }

  bar.stop();

  return hashMap;
}

const BITS = [
  /** 16 bit hex; length = 4 */
  4,
  /** 64 bit hex; length = 16 */
  8,
  /** 256 bit hex; length = 64 */
  16
] as const;

async function main() {
  for(const bits of BITS) {
    const map = await genHashMap(bits);
    fs.writeFileSync(path.join(DATA_OUT, `hash${bits}.json`), JSON.stringify(map, null, '  '));
  }
}

main().catch(console.error);
