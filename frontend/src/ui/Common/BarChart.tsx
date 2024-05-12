import "chart.js/auto";
import React from "react";
import { Bar } from "react-chartjs-2";

type BarChartProps = { data: string[]; chartLabel: string; labels: string[] };

export const BarChart: React.FC<BarChartProps> = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.chartLabel,
        data: props.data,
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
