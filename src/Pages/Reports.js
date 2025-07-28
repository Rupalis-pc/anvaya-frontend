import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import "../CSS/reports.css";

function Reports() {
  // Simple data
  const leadsClosedData = [
    { name: "Closed", value: 10 },
    { name: "Pipeline", value: 15 },
  ];

  const statusDistribution = [
    { name: "New", value: 5 },
    { name: "Contacted", value: 3 },
    { name: "Qualified", value: 2 },
  ];

  const agentPerformance = [
    { name: "Agent A", count: 5 },
    { name: "Agent B", count: 3 },
    { name: "Agent C", count: 2 },
  ];

  return (
    <div>
      <NavBar title="Anvaya CRM Reports" />
      <div className="mainContent">
        <SideBar showOnlyBackButton={true} />

        <div className="reportsSection">
          {/* Pie Chart 1 */}
          <section className="card">
            <h3>Total Leads closed and in Pipeline</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={leadsClosedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
              />
              <Tooltip />
            </PieChart>
          </section>

          {/* Bar Chart */}
          <section className="card">
            <h3>Leads Closed by Sales Agent</h3>
            <BarChart width={300} height={200} data={agentPerformance}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="count" fill="#8884d8" />
              <Tooltip />
            </BarChart>
          </section>

          {/* Pie Chart 2 */}
          <section className="card">
            <h3>Lead Status Distribution</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
              />
              <Tooltip />
            </PieChart>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Reports;
