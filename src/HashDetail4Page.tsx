import React from 'react';
import HashDetail from './HashDetail';
import hash4 from './data/hash4.json';
import dist4 from './data/dist4.json';

const Hash4DetailPage: React.FC = () => (
  <HashDetail hashMap={hash4} distMap={dist4} />
);

export default Hash4DetailPage;
