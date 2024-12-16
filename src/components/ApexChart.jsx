import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function PriceChart({ id, days }) {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
        );
        const data = await response.json();
        const prices = data.prices;
        setChartData(prices.map((price) => price[1]));
        setChartLabels(prices.map((price) => new Date(price[0]).toLocaleDateString()));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchChartData();
  }, [id, days]);

  const options = {
    chart: {
      id: "crypto-chart",
      type: "area",
      background: "#16171A",
      toolbar: {
        show: false,
      },
    },
    theme: {
      mode: "dark",
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: {
          colors: "#A9A9A9",
        },
        grid: {
          show: true, 
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#808080",
          fontSize: 16,
        },
        formatter: (value) =>{
          return value.toFixed(2)
        }
      },
    },
    stroke: {
      curve: "smooth",
      width: 2, 
      colors: ['#87CEEB']
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 0,
      gradient: {
        shade: "dark",
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Price (USD)",
      data: chartData,
    },
  ];

  return <Chart options={options} series={series} type="area" height={646} />;
}
