import { useEffect, useState } from 'react';

import './App.css';

import { Countries } from './Countries';
import { fetchCurrentData, getRookies, getNewbies } from './fetchData';
import { Ages } from './Ages';
import { Experience } from './Experience';
import { SelectableCategory } from './SelectableCategory';
import { ALL } from './constants';

// TODO: store

function App() {
  const [filters, setfilters] = useState({
    category: ALL,
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('** cange');
    fetchCurrentData({
      category: filters.category,
      setData,
      setLoading,
      setError,
    });
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const rookieList = () => {
    return getRookies(data).map((rook) => (
      <li
        key={rook.uuid}
        className="listname"
      >{`${rook.data.first_name} ${rook.data.last_name}`}</li>
    ));
  };
  const newbieList = () => {
    return getNewbies(data).map((newbie) => (
      <li
        key={newbie.uuid}
        className="listname"
      >{`${newbie.data.first_name} ${newbie.data.last_name}`}</li>
    ));
  };
  const ridersList = () => {
    return data.map((rider) => (
      <li
        key={rider.uuid}
        title={JSON.stringify(rider)}
        className="listname"
      >{`${rider.data.first_name} ${rider.data.last_name}`}</li>
    ));
  };

  const onValueChange = (fieldName, value) => {
    setfilters((state) => ({
      ...state,
      [fieldName]: value,
    }));
  };

  return (
    <>
      <header>
        <SelectableCategory data={data} onValueChange={onValueChange} />
        <h1 id="year">2023</h1>
      </header>
      <div className="container">
        <div className="stats">
          <h4>{filters.category}</h4>
          {/* <h4>{CATEGORIES.filter((cat) => cat === data[0].category)}</h4> */}
          <p>Inscritos: {data.length}</p>
          {ridersList()}
          <p>Rookies: {getRookies(data).length}</p>
          {rookieList()}
          <p>Newbies: {getNewbies(data).length}</p>
          {newbieList()}
        </div>
        <div className="gfx">
          <Ages data={data} />
          <Experience data={data} />
          <Countries data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
