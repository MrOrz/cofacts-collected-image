import React from 'react';
import HashDetail from './HashDetail';
import hash12 from './data/hash12.json';
import dist12 from './data/dist12.json';

const Hash12DetailPage: React.FC = () => (
  <HashDetail hashMap={hash12} distMap={dist12} />
);

export default Hash12DetailPage;
