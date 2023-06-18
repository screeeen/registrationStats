import React, { useEffect, useRef } from 'react';
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
// import { Line } from 'react-chartjs-2';

export const renderChart = (riders) => {
  //   const chartRef = useRef(null);
  //   const ctx = chartElement.getContext('2d');

  //   var ctx = document.getElementById('Ages').getContext('2d');
  //   var ctx2 = document.getElementById('Countries').getContext('2d');
  //   var ctx3 = document.getElementById('Discipline').getContext('2d');
  //   var ctx4 = document.getElementById('DisciplineBars').getContext('2d');
  //   var ctx5 = document.getElementById('Sport').getContext('2d');
  //   var ctx6 = document.getElementById('SportMod').getContext('2d');

  var paid = riders.map((rider) => rider.paid);
  //   var country = riders
  //     // .filter((rider) => rider.country !== "Spain")
  //     .map((rider) => rider.country);
  var sport = riders.map((rider) => rider.sport);

  var sportMod = sport.map((sport) => {
    return sport;
  });

  const freqMapPaid = ages.reduce(
    (map, year) => map.set(paid, (map.get(paid) || 0) + 1),
    new Map(),
  );

  //   const freqMapCountry = country.reduce(
  //     (map, country) => map.set(country, (map.get(country) || 0) + 1),
  //     new Map(),
  //   );

  const freqMapSport = sport.reduce(
    (map, sport) => map.set(sport, (map.get(sport) || 0) + 1),
    new Map(),
  );

  const freqMapSportMod = sportMod.reduce(
    (map, sportMod) => map.set(sportMod, (map.get(sportMod) || 0) + 1),
    new Map(),
  );

  //   const xAxisArrCountry = Array.from(freqMapCountry.keys()); // array of unique years
  //   const yAxisArrCountry = Array.from(freqMapCountry.values()); // array of frequencies for each year
  //   xAxisArrCountry.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  //   yAxisArrCountry.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const xAxisArrSport = Array.from(freqMapSport.keys()); // array of unique years
  const yAxisArrSport = Array.from(freqMapSport.values()); // array of frequencies for each year

  xAxisArrSport.unshift(0); // Array.from(freqMap.keys()); // array of unique years
  yAxisArrSport.unshift(0); // Array.from(freqMap.values()); // array of frequencies for each year

  const xAxisArrSportMod = Array.from(freqMapSportMod.keys()); // array of unique years
  const yAxisArrSportMod = Array.from(freqMapSportMod.values()); // array of frequencies for each year

  const WCSMen =
    freqMapSport.get('WCS Men') + freqMapSport.get('WCS Men + WCS Miniramp');
  const WCSWomen =
    freqMapSport.get('WCS Women') +
    +freqMapSport.get('WCS Women + WCS Miniramp');
  const WCSMiniramp =
    freqMapSport.get('WCS Miniramp') +
    +freqMapSport.get('WCS Men + WCS Miniramp') +
    +freqMapSport.get('WCS Women + WCS Miniramp');
  const totalPaid = freqMapPaid.get('paid');

  const freqMapDiscipline = new Map();

  freqMapDiscipline.set('WCS Men', WCSMen);
  freqMapDiscipline.set('WCS Women', WCSWomen);
  freqMapDiscipline.set('WCS Miniramp', WCSMiniramp);

  //   const menTag = document.getElementById('men');
  //   const womenTag = document.getElementById('women');
  //   const miniTag = document.getElementById('mini');
  //   const totalTag = document.getElementById('total');
  //   const paidTag = document.getElementById('paid');

  //   menTag.innerText = `WCS Men registered: ${WCSMen}`;
  //   womenTag.innerText = `WCS Women registered: ${WCSWomen} `;
  //   miniTag.innerText = `WCS Miniramp registered: ${WCSMiniramp}`;
  //   totalTag.innerText = `Total registered: ${WCSMiniramp + WCSMen + WCSWomen}`;
  //   paidTag.innerText = `Paid registration: ${paid.length}`;

  //   const xAxisArrDiscipline = Array.from(freqMapDiscipline.keys()); // array of unique years
  //   const yAxisArrDiscipline = Array.from(freqMapDiscipline.values()); // array of frequencies for each year

  //   var DisciplineDistroBars = new Chart(ctx4, {
  //     type: 'bar',
  //     data: {
  //       labels: xAxisArrDiscipline,
  //       datasets: [
  //         {
  //           label: 'contest Distro',
  //           data: yAxisArrDiscipline,
  //           fill: true,
  //           backgroundColor: 'rgb(60,179,113)',
  //           borderColor: 'rgb(60,179,113)',
  //           // pointBackgroundColor: "rgb(255, 99, 132)",
  //           // pointBorderColor: "#fff",
  //           // pointHoverBackgroundColor: "#fff",
  //           // pointHoverBorderColor: "rgb(255, 99, 132)",
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       title: {
  //         display: true,
  //         text: 'Contest Distro',
  //       },
  //       scales: {
  //         yAxes: [
  //           {
  //             display: true,
  //             ticks: {
  //               beginAtZero: true,
  //               min: 0,
  //               stepSize: 5,
  //               // max: 20,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });

  //   var Sports = new Chart(ctx5, {
  //     type: 'radar',
  //     data: {
  //       labels: xAxisArrSport,
  //       datasets: [
  //         {
  //           label: 'contest',
  //           data: yAxisArrSport,
  //           fill: false,
  //           backgroundColor: 'rgb(60,179,113)',
  //           borderColor: 'rgb(60,179,113)',
  //         },
  //       ],
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Contest registered',
  //       },
  //     },
  //   });

  //   var SportsDistro = new Chart(ctx6, {
  //     type: 'bar',
  //     data: {
  //       labels: xAxisArrSportMod,
  //       datasets: [
  //         {
  //           label: 'contest Distro',
  //           data: yAxisArrSportMod,
  //           fill: true,
  //           backgroundColor: 'rgb(60,179,113)',
  //           borderColor: 'rgb(60,179,113)',
  //         },
  //       ],
  //     },
  //     options: {
  //       title: {
  //         display: true,
  //         text: 'Contest Distro',
  //       },
  //       scales: {
  //         yAxes: [
  //           {
  //             display: true,
  //             ticks: {
  //               beginAtZero: true,
  //               min: 0,
  //               // max: 20,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   });

  //   return <canvas ref={chartRef} />;
};
