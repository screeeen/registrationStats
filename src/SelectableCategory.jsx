import React, { useState } from 'react';

export const SelectableCategory = ({ data, onValueChange }) => {
  const [currentCatergory, setCurrentCatergory] = useState('STREETMINIMEN');
  const categories = [
    'STREETMINIMEN',
    'STREETMINIWO',
    'STREETMEN',
    'STREETWO',
    'MINI',
  ];

  const handleChange = (event) => {
    setCurrentCatergory(event.target.value);
    onValueChange('category', event.target.value);
  };

  const getCatergories = () =>
    categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

  return (
    <>
      <select value={currentCatergory} label="Category" onChange={handleChange}>
        {getCatergories()}
      </select>
    </>
  );
};
