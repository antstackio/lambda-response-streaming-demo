import BenchmarkChart from "../../components/chart";
import BenchmarkTable from "../../features/BenchmarkTable";
import  Chart  from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale)
// import GenericHeader from "../../containers/Header";

// import "./Ddb.css";
const BenchmarkPage = () => (
  <>
    {/* <GenericHeader Title="Revolutionizing Data Retrieval" /> */}
        <BenchmarkTable />
        <BenchmarkChart />
  </>
);
export default BenchmarkPage;
