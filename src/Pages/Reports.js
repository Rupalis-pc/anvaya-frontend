import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import PieChartComponent from "./PieChartComponent";
import LeadsByStatusChart from "./LeadsByStatusChart";
import SalesAgentPieChart from "./SalesAgentPieChart";
import DashboardLayout from "../Components/DashboardLayout";
import "../CSS/reports.css";

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
    <DashboardLayout title="Anvaya CRM Reports" showOnlyBackButton={true}>
      <div className="reportsSection">
        <PieChartComponent />
        <SalesAgentPieChart />
        <LeadsByStatusChart />
      </div>
    </DashboardLayout>
  );
}
