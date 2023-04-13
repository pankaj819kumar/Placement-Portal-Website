import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ placementData }) => {
  const data = {
    labels: placementData.map((data) => data.label),
    datasets: [
      {
        label: "Students Placed",
        data: placementData.map((data) => data.count),
        backgroundColor: [
          // "rgba(75,192,192,1)",
          // "#ecf0f1",
          // "#50AF95",
          // "#f3ba2f",
          "#2a71d0",
        ],
        // borderColor: "#2a71d0",
        // borderWidth: 2,
      },
    ],
  };
  // const options = {
  //   maintainAspectRatio: false,
  //   responsive: true,
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //           stepSize: 1,
  //         },
  //       },
  //     ],
  //   },
  //   height: 50, // Set the height here
  // };
  return <Bar data={data} />;
};

export default BarChart;
