import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';
import { GamePage, Home, NotFound } from './pages';

export const App = () => {
  return (
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='game/:id' element={<GamePage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
  );
};
