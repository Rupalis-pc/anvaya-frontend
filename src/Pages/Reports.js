import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import PieChartComponent from "./PieChartComponent";
import "../CSS/reports.css";
import LeadsByStatusChart from "./LeadsByStatusChart";
import SalesAgentPieChart from "./SalesAgentPieChart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function Reports() {
  return (
    <div>
      <NavBar title="Anvaya CRM Reports" />
      <div className="main">
        <SideBar showOnlyBackButton={true} />
        <div className="reportsSection">
          <PieChartComponent />
          <SalesAgentPieChart />
          <LeadsByStatusChart />
        </div>
      </div>
    </div>
  );
}
