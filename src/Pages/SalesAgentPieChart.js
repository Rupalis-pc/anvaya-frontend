import { Pie } from "react-chartjs-2";
import useLeadsContext from "../Context/useContext";

export default function SalesAgentPieChart() {
  const { leads, agents } = useLeadsContext();
  const closedLeads = leads.filter((lead) => lead.status === "Closed");

  const closedLeadsCount = closedLeads.reduce((acc, lead) => {
    const agentId = lead.salesAgent || "Unassigned";
    acc[agentId] = (acc[agentId] || 0) + 1;
    return acc;
  }, {});

  console.log(closedLeadsCount);

  const labels = Object.keys(closedLeadsCount).map((agentId) => {
    const agent = agents.find((a) => a._id === agentId);
    return agent ? agent.name : "Unassigned";
  });

  const counts = Object.values(closedLeadsCount);

  const backgroundColors = [
    "lightgreen",
    "skyblue",
    "moccasin",
    "plum",
    "salmon",
    "powderblue",
    "palegreen",
    "lightpink",
    "lightgoldenrodyellow",
    "wheat",
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
