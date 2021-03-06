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
const HashList6Page = React.lazy(() => import('./HashList6Page'));
const HashList8Page = React.lazy(() => import('./HashList8Page'));
const HashList12Page = React.lazy(() => import('./HashList12Page'));
const HashList16Page = React.lazy(() => import('./HashList16Page'));
const HashDetail4Page = React.lazy(() => import('./HashDetail4Page'));
const HashDetail6Page = React.lazy(() => import('./HashDetail6Page'));
const HashDetail8Page = React.lazy(() => import('./HashDetail8Page'));
const HashDetail12Page = React.lazy(() => import('./HashDetail12Page'));
const HashDetail16Page = React.lazy(() => import('./HashDetail16Page'));

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
        <Route path="/6">
          <Route path="" element={<React.Suspense fallback={<HashListPageSkeleton />}>
            <HashList6Page />
          </React.Suspense>} />
          <Route path=":hash" element={<React.Suspense fallback={<HashDetailSkeleton />}>
            <HashDetail6Page />
          </React.Suspense>} />
        </Route>
        <Route path="/8">
          <Route path="" element={<React.Suspense fallback={<HashListPageSkeleton />}>
            <HashList8Page />
          </React.Suspense>} />
          <Route path=":hash" element={<React.Suspense fallback={<HashDetailSkeleton />}>
            <HashDetail8Page />
          </React.Suspense>} />
        </Route>
        <Route path="/12">
          <Route path="" element={<React.Suspense fallback={<HashListPageSkeleton />}>
            <HashList12Page />
          </React.Suspense>} />
          <Route path=":hash" element={<React.Suspense fallback={<HashDetailSkeleton />}>
            <HashDetail12Page />
          </React.Suspense>} />
        </Route>
        <Route path="/16">
          <Route path="" element={<React.Suspense fallback={<HashListPageSkeleton />}>
            <HashList16Page />
          </React.Suspense>} />
          <Route path=":hash" element={<React.Suspense fallback={<HashDetailSkeleton />}>
            <HashDetail16Page />
          </React.Suspense>} />
        </Route>
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
