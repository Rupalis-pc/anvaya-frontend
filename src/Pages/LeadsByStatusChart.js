import { Bar } from "react-chartjs-2";
import useLeadsContext from "../Context/useContext";

export default function LeadsByStatusChart() {
  const { leads } = useLeadsContext();

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Leads by Status",
        data: Object.values(statusCounts),
        backgroundColor: "skyblue",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "2rem auto" }}>
      <h2>Lead Status Distribution</h2>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}
