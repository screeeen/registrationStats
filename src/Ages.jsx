import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const Ages = ({ data }) => {
  var ages = data.map((rider) => rider.years_old);
  ages.sort((a, b) => a - b);
  const freqMapAges = ages.reduce(
    (map, year) => map.set(year, (map.get(year) || 0) + 1),
    new Map(),
  );

  const xAxisArrAges = Array.from(freqMapAges.keys()); // array of unique years
  const yAxisArrAges = Array.from(freqMapAges.values()); // array of frequencies for each year
  xAxisArrAges.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrAges.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const options = {
    title: {
      display: true,
      text: 'Distribution of Ages',
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        stepSize: 5,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        beginAtZero: true,
        max: 50,
        stepSize: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const dataChart = {
    labels: xAxisArrAges.map((lab) => lab),
    datasets: [
      {
        label: 'ages',
        data: yAxisArrAges,
        fill: true,
        backgroundColor: 'rgb(60,179,113)',
        borderColor: 'rgb(60,179,113)',
      },
    ],
  };

  return <Line data={dataChart} options={options} />;
};
