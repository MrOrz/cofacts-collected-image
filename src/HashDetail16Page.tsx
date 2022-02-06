import React from 'react';
import HashDetail from './HashDetail';
import hash16 from './data/hash16.json';
import dist16 from './data/dist16.json';

const Hash16DetailPage: React.FC = () => (
  <HashDetail hashMap={hash16} distMap={dist16} />
);

export default Hash16DetailPage;
