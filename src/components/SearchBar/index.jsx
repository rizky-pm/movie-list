import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
  return (
    <div className='relative flex justify-center font-source-sans-pro text-prussianBlue w-full'>
      <input
        className='w-full md:w-1/2 lg:w-1/4 px-16 py-3 text-center rounded-md outline-none bg-aliceBlue text-darkGray box-shadow'
        type='text'
        name='searchCountry'
        id='searchCountry'
        placeholder='Search Movie'
        onChange={(e) => {
          const query = e.target.value.toLocaleLowerCase();

          setSearchQuery(query);
        }}
      />
    </div>
  );
};

export default SearchBar;
