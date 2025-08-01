import { Pie } from "react-chartjs-2";
import useFetch from "../useFetch";

export default function PieChartComponent() {
  const { data: leadsClosed } = useFetch(
    "https://anvaya-backend-two.vercel.app/report/last-week",
    []
  );
  const { data: leadsInPipeline } = useFetch(
    "https://anvaya-backend-two.vercel.app/report/pipeline",
    []
  );

  const closedCount = Array.isArray(leadsClosed) ? leadsClosed.length : 0;
  const pipelineCount = leadsInPipeline?.totalPipelineLeads || 0;

  const pieData = {
    labels: ["Closed Leads", "Pipeline Leads"],
    datasets: [
      {
        label: "Leads Overview",
        data: [closedCount, pipelineCount],
        backgroundColor: ["#4caf50", "#2196f3"],
        borderColor: ["#388e3c", "#1976d2"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "400px", margin: "2rem auto" }}>
      <h2>Total Leads Closed and in Pipeline</h2>
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
}
