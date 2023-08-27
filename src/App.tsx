import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from './layouts/MainLayout';
import { Game, Home, NotFound } from './pages';

export const App = () => {
  return (
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='' element={<Home />} />
          <Route path='game/:id' element={<Game />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
  );
};
