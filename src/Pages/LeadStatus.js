import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Dashboard.css";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";

export default function LeadStatus() {
  const navigate = useNavigate();

  const leads = [
    { id: 1, name: "Lead 1", status: "New" },
    { id: 2, name: "Lead 2", status: "Contacted" },
    { id: 3, name: "Lead 3", status: "Qualified" },
  ];

  const leadStatus = "New";
  const filteredLeads = leads.filter((lead) => lead.status === leadStatus);

  return (
    <div>
      <NavBar title="Leads By Status" />
      <main className="mainContent">
        <SideBar showOnlyBackButton={true} />
        <div className="mainDashboard">
          <section className="card">
            <h3>Status: {leadStatus}</h3>
            <div className="lead-list">
              {filteredLeads.map((lead) => (
                <span key={lead.id} className="lead-item">
                  {lead.name} ({lead.status})
                </span>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
