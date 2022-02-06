import React from 'react';
import HashDetail from './HashDetail';
import hash8 from './data/hash8.json';
import dist8 from './data/dist8.json';

const Hash8DetailPage: React.FC = () => (
  <HashDetail hashMap={hash8} distMap={dist8} />
);

export default Hash8DetailPage;
