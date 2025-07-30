import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Dashboard.css";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import useLeadsContext from "../Context/useContext";

export default function LeadsByStatus() {
  const { status } = useParams();
  const { leads, leadsLoading } = useLeadsContext();
  const filteredLeads = leads.filter((lead) => lead.status === status);

  return (
    <div>
      <NavBar title=" Lead List by Status" />
      <main className="main">
        <SideBar showOnlyBackButton={true} />
        <div className="content">
          <section className="card">
            <h3>Status: {status}</h3>
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
