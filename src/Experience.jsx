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

export const Experience = ({ data }) => {
  var exp = data.map((rider) => rider.years_skating);
  exp.sort((a, b) => a - b);
  const freqMapExperience = exp.reduce(
    (map, year) => map.set(year, (map.get(year) || 0) + 1),
    new Map(),
  );

  const xAxisArrExp = Array.from(freqMapExperience.keys()); // array of unique years
  const yAxisArrExp = Array.from(freqMapExperience.values()); // array of frequencies for each year
  xAxisArrExp.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrExp.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const options = {
    title: {
      display: true,
      text: 'Distribution of Experience in years',
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 20,
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
          stepSize: 0.5,
        },
      },
    },
  };

  const dataChart = {
    labels: xAxisArrExp.map((lab) => lab),
    datasets: [
      {
        label: 'experience in years',
        data: yAxisArrExp,
        fill: true,
        backgroundColor: 'rgb(60,179,113)',
        borderColor: 'rgb(60,179,113)',
      },
    ],
  };

  return <Line data={dataChart} options={options} />;
};
