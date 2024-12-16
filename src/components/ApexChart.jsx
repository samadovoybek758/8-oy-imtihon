import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function PriceChart({ id, days }) {
  const [Ydata, setYdata] = useState([]);
  const [Xdata, setXdata] = useState([]);

  useEffect(() => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      )
        .then((response) => response.json())  
        .then((data) => {
          const price = data.prices;
          setXdata(price.map((price) => new Date(price[0]).toLocaleDateString()));
          setYdata(price.map((price) => price[1]));
        })
        .catch((error) => {
          console.error(error);
        });
    },
   [id, days]);

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
      categories: Xdata,
      labels: {
        style: {
          colors: "#A9A9A9",
        },
        grid: {
          colors: "#A9A9A9",
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
        },
        grid: {
          show: false,  
        }
      },
     
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
    stroke: {
      curve: "smooth",
      width: 2, 
      colors: ['#87CEEB']
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Price (USD)",
      data: Ydata,
    },
  ];

  return <Chart options={options} series={series} type="area" height={646} />;
}
