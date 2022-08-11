import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Detail from '../pages/Detail/Detail';

import Main from '../pages/Main';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/detail/:imdbID' element={<Detail />} />
    </Routes>
  );
};

export default Routers;
