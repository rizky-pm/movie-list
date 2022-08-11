import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className='font-source-sans-pro bg-prussianBlue text-aliceBlue h-[5vh] px-4 lg:px-8 flex items-center'>
      <Link to='/' className='font-bold text-2xl uppercase tracking-[0.25em]'>
        Moflix
      </Link>
    </nav>
  );
};

export default Navigation;
