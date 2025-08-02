import { Pie } from "react-chartjs-2";
import useFetch from "../useFetch";
import { API_ENDPOINT } from "../Common/helper";

export default function PieChartComponent() {
  const { data: leadsClosed } = useFetch(
    `${API_ENDPOINT}/report/last-week`,
    []
  );
  const { data: leadsInPipeline } = useFetch(
    `${API_ENDPOINT}/report/pipeline`,
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
        backgroundColor: ["lightgreen", "skyblue"],
        borderColor: ["green", "blue"],
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
    <div className="chartCard">
      <h2>Total Leads Closed and in Pipeline</h2>
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
}
