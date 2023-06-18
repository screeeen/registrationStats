import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';

import './App.css';

/* load the codepage support library for extended support with older formats  */
import { set_cptable } from 'xlsx';
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';
import { Countries } from './Countries';
import {
  fetchCurrentData,
  fetchData,
  getRiders,
  getRookies,
  getNewbies,
} from './fetchData';
import { Ages } from './Ages';
import { Experience } from './Experience';
import { SelectableCategory } from './SelectableCategory';
const CURRENT_YEAR = true;
set_cptable(cptable);

//TODO: hacer adaptador para ambos modos current y no current?
window.addEventListener('beforeunload', function () {
  localStorage.clear();
});

function App() {
  const [filters, setfilters] = useState({
    category: 'STREETMINIMEN',
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedDataJSON = localStorage.getItem('apiData');

    if (storedDataJSON) {
      const storedData = JSON.parse(storedDataJSON);
      setData(storedData);
      setLoading(false);
      return;
    } else {
      CURRENT_YEAR
        ? fetchCurrentData({
            category: filters.category,
            setData,
            setLoading,
            setError,
          })
        : fetchData(setData, setLoading, setError);
    }
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
      >{`${rook.first_name} ${rook.last_name}`}</li>
    ));
  };
  const newbieList = () => {
    return getNewbies(data).map((newbie) => (
      <li
        key={newbie.uuid}
        className="listname"
      >{`${newbie.first_name} ${newbie.last_name}`}</li>
    ));
  };

  const ridersList = () => {
    return data.map((rider) => (
      <li
        key={rider.uuid}
        title={JSON.stringify(rider)}
        className="listname"
      >{`${rider.first_name} ${rider.last_name}`}</li>
    ));
  };

  const onValueChange = (fieldName, value) => {
    localStorage.clear();

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
        <div id="stats">
          <h4>{data[0].category}</h4>
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
