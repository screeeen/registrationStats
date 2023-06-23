import { useState } from 'react';
import { CATEGORIES } from './constants';

export const SelectableCategory = ({ onValueChange }) => {
  const [currentCatergory, setCurrentCatergory] = useState(CATEGORIES[0]);

  const handleChange = (event) => {
    setCurrentCatergory(event.target.value);
    onValueChange('category', event.target.value);
  };

  const getCatergories = () =>
    CATEGORIES.map((category) => (
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
