import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';
import App from './App';
import HashListPageSkeleton from './HashListPageSkeleton';
import HashDetailSkeleton from './HashDetailSkeleton';
import reportWebVitals from './reportWebVitals';

const HashList4Page = React.lazy(() => import('./HashList4Page'));
const HashList8Page = React.lazy(() => import('./HashList8Page'));
const HashList16Page = React.lazy(() => import('./HashList16Page'));
const HashDetail4Page = React.lazy(() => import('./HashDetail4Page'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/4">
          <Route path="" element={<React.Suspense fallback={<HashListPageSkeleton />}>
            <HashList4Page />
          </React.Suspense>} />
          <Route path=":hash" element={<React.Suspense fallback={<HashDetailSkeleton />}>
            <HashDetail4Page />
          </React.Suspense>} />
        </Route>
        <Route path="/8" element={<React.Suspense fallback={<HashListPageSkeleton />}>
          <HashList8Page />
        </React.Suspense>} />
        <Route path="/16" element={<React.Suspense fallback={<HashListPageSkeleton />}>
          <HashList16Page />
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
