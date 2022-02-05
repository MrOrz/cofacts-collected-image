import React from 'react';
import './App.css';
import HashList from './HashList';
// import dist4 from './data/dist4.json';
import hash4 from './data/hash4.json';

function App() {
  return (
    <HashList hashMap={hash4} />
  );
}

export default App;
