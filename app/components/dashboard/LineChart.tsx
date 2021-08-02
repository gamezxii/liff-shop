import React from "react";
import { Line } from "react-chartjs-2";

interface chart {
  _id: string;
  total: number;
}

interface Props {
  charts: chart[];
  label: string;
}

const Chartincome = ({ charts, label }: Props) => {
  const [total, setTotal] = React.useState([]);
  const [title, setTitle] = React.useState([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
      },
    },
  };

  React.useEffect(() => {
    if (charts.length > 0) {
      for (const iterator of charts) {
        const { _id, total } = iterator;
        setTitle((pre) => [...pre, _id]);
        setTotal((pre) => [...pre, total]);
      }
    }
  }, [charts]);

  return (
    <div>
      <Line
        type="area"
        data={{
          labels: title,
          datasets: [
            {
              label: `Chart ${label}`,
              backgroundColor: "#50FFAE",
              borderWidth: 3,
              data: total,
              borderColor: "rgb(0, 138, 255)",
              fill: true,
            },
          ],
        }}
        options={options}
        width={800}
        height={400}
      />
    </div>
  );
};

export default Chartincome;
