import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";

export default function Dashboard() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();
  const statusArr = ["All", "New", "Contacted"];

  const leads = [
    { id: 1, name: "Lead 1", status: "New" },
    { id: 2, name: "Lead 2", status: "Contacted" },
    { id: 3, name: "Lead 3", status: "Qualified" },
  ];

  const filteredLeads =
    filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  return (
    <div>
      <NavBar title="Anvaya CRM Dashboard" />
      <main className="mainContent">
        <SideBar showOnlyBackButton={false} />
        <div className="mainDashboard">
          {/* Lead List */}
          <section className="card">
            <h3>Leads</h3>
            <div className="lead-list">
              {filteredLeads.map((lead) => (
                <span key={lead.id} className="lead-item">
                  {lead.name} ({lead.status})
                </span>
              ))}
            </div>
          </section>
          {/* Lead Status */}
          <section className="card">
            <h3>Lead Status</h3>
            <ul>
              <li>New: 5 Leads</li>
              <li>Contacted: 3 Leads</li>
              <li>Qualified: 2 Leads</li>
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
        </div>
      </main>
    </div>
  );
}
