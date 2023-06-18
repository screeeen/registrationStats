import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const Countries = ({ data }) => {
  var country = data
    // .filter((rider) => rider.country !== "Spain")
    .map((rider) => rider.data.country);

  const freqMapCountry = country.reduce(
    (map, country) => map.set(country, (map.get(country) || 0) + 1),
    new Map(),
  );

  const xAxisArrCountry = Array.from(freqMapCountry.keys()); // array of unique years
  const yAxisArrCountry = Array.from(freqMapCountry.values()); // array of frequencies for each year
  xAxisArrCountry.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrCountry.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const options = {
    title: {
      display: true,
      text: 'Geographic Distribution',
    },
    scales: {
      r: {
        max: 20,
        min: 0,
        ticks: {
          // stepSize: 0.5,
        },
      },
    },
  };

  const dataChart = {
    labels: xAxisArrCountry,
    datasets: [
      {
        label: 'countries',
        data: yAxisArrCountry,
        fill: false,
        backgroundColor: 'rgb(60,179,113)',
        borderColor: 'rgb(60,179,113)',
        // pointBackgroundColor: "rgb(255, 99, 132)",
        // pointBorderColor: "#fff",
        // pointHoverBackgroundColor: "#fff",
        // pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return <Radar options={options} data={dataChart} />;
};
