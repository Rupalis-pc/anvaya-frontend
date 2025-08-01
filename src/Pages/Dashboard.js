import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";
import useLeadsContext from "../Context/useContext";
import Loader from "../Components/Loader";
import DashboardLayout from "../Components/DashboardLayout";

export default function Dashboard() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const statusArr = [
    "All",
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const { leads, leadsLoading } = useLeadsContext();

  const filteredLeads =
    filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <DashboardLayout title="Anvaya CRM Dashboard" showOnlyBackButton={false}>
      <>
        {leadsLoading ? (
          <Loader />
        ) : (
          <>
            {/* Lead List */}
            <section className="card">
              <h3>Leads</h3>
              <div className="lead-list">
                {filteredLeads.map((lead) => (
                  <span
                    key={lead._id}
                    className="lead-item"
                    onClick={() => navigate(`/lead/${lead._id}`)}
                  >
                    {lead.name} ({lead.status})
                  </span>
                ))}
              </div>
            </section>
            {/* Lead Status */}
            <section className="card">
              <h3>Lead Status</h3>
              <ul>
                {statusArr
                  .filter((status) => status !== "All")
                  .map((status) => {
                    const count = leads.filter(
                      (lead) => lead.status === status
                    ).length;
                    return (
                      <li key={status}>
                        <Link className="statusLink" to={`/leads/${status}`}>
                          {status}: {count} Lead{count !== 1 ? "s" : ""}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </section>
            {/* Quick Filters */}
            <section className="card">
              <h3>Quick Filters</h3>
              <div className="filterBtns">
                {statusArr.map((status) => (
                  <button
                    key={status}
                    className={`filterBtn ${filter === status ? "active" : ""}`}
                    onClick={() => setFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </section>
            {/* Add Lead Button */}
            <button className="addBtn" onClick={() => navigate("/leadform")}>
              Add New Lead
            </button>
          </>
        )}
      </>
    </DashboardLayout>
  );
}
