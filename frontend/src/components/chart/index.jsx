import { Line } from "react-chartjs-2";
import benchmarksData from "../../data/benchmark.json"

// import {
//   FieldTimeOutlined,
//   CloudDownloadOutlined,
//   DatabaseOutlined,
// } from "@ant-design/icons";

// const icons = {
//   ttfb: (
//     <>
//       <FieldTimeOutlined /> {"Time To First Byte"}
//     </>
//   ),
//   apiTime: (
//     <>
//       <CloudDownloadOutlined /> {"Total API Time"}
//     </>
//   ),
//   ddbItems: (
//     <>
//       <DatabaseOutlined /> {"DynamoDB Records"}
//     </>
//   ),
// };

const BenchmarkChart = () => {
  const labels = benchmarksData.Benchmarks.map((item) => item.Operation)

  const keys = Object.keys(benchmarksData.Benchmarks[0]).filter((item) => item !== "Operation")

  const colours = ["red", "blue"]

  const datasets = keys.map((item) => { return { label: item, data: benchmarksData.Benchmarks.map((i) => { console.log(item, i[item]); return i[item] }), borderColor: colours[keys.indexOf(item)] } })
  return (
    <div className="line-chart">
      <Line data={{ labels: labels, datasets: datasets }} />
    </div>);
};
export default BenchmarkChart;
