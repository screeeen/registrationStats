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

export const Discipline = () => {


    
  var Discipline = new Chart(ctx3, {
    type: 'radar',
    data: {
      labels: xAxisArrDiscipline,
      datasets: [
        {
          label: 'contest',
          data: yAxisArrDiscipline,
          fill: true,
          backgroundColor: 'rgb(60,179,113)',
          borderColor: 'rgb(60,179,113)',
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Contest registered',
      },
      r: {
        // max: 1,
        min: 0,
        ticks: {
          stepSize: 20,
        },
      },
    },
  });

  return <Radar>;
};
