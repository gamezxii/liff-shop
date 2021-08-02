import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ApexChartArea = ({ charts, label }) => {
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
      zoom: {
        enabled: false,
      },
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  React.useEffect(() => {
    if (charts.length > 0) {
      let labels = [];
      let data = [];
      for (const iterator of charts) {
        const { _id, total } = iterator;
        labels.push(_id);
        data.push(total);
      }
      setSeries([
        {
          name: label,
          data: data,
        },
      ]);
      setOptions({ ...options, xaxis: { categories: labels } });
    }
  }, [charts]);

  return (
    <div>
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
};

export default ApexChartArea;
