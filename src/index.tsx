import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import HashPageSkeleton from './HashPageSkeleton';
import reportWebVitals from './reportWebVitals';

const Hash4Page = React.lazy(() => import('./Hash4Page'));
const Hash8Page = React.lazy(() => import('./Hash8Page'));
const Hash16Page = React.lazy(() => import('./Hash16Page'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/4/hashes" element={<React.Suspense fallback={<HashPageSkeleton />}>
          <Hash4Page />
        </React.Suspense>} />
        <Route path="/8/hashes" element={<React.Suspense fallback={<HashPageSkeleton />}>
          <Hash8Page />
        </React.Suspense>} />
        <Route path="/16/hashes" element={<React.Suspense fallback={<HashPageSkeleton />}>
          <Hash16Page />
        </React.Suspense>} />
      </Routes>
    </BrowserRouter>
    <CssBaseline />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
