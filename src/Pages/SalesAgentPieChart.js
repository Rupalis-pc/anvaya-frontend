import { Pie } from "react-chartjs-2";
import useLeadsContext from "../Context/useContext";

export default function SalesAgentPieChart() {
  const { leads } = useLeadsContext();
  const data = leads.reduce((acc, lead) => {
    const agentName = lead.salesAgent?.name || "Unassigned";
    acc[agentName] = (acc[agentName] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(data);
  const counts = Object.values(data);

  const backgroundColors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#9c27b0",
    "#f44336",
    "#00bcd4",
    "#8bc34a",
    "#e91e63",
    "#ffc107",
    "#795548",
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Leads by Agent",
        data: counts,
        backgroundColor: backgroundColors.slice(0, labels.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "500px", margin: "2rem auto" }}>
      <h2>Lead Closed by Sales Agent</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
}
