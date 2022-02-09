import React from 'react';
import codegen from 'codegen.macro';
import HashDetail from './HashDetail';
import hash8 from './data/hash8.json';
import type { HashDistMap } from './scripts/genDistMap';

// Directly import this file will cause OOM.
// Use babel macro to embed the data right into code instead.
//
let dist8: HashDistMap = {};
codegen`
  const fs = require('fs')
  module.exports = 'dist8 = ' + fs.readFileSync('./data/dist8.json', 'utf8')
`;

const Hash8DetailPage: React.FC = () => (
  <HashDetail hashMap={hash8} distMap={dist8} />
);

export default Hash8DetailPage;
