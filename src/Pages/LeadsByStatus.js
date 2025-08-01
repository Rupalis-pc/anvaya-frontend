import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../CSS/Dashboard.css";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import useLeadsContext from "../Context/useContext";
import "../CSS/LeadsByStatus.css";
import { PRIORITIES } from "../Common/helper";

export default function LeadsByStatus() {
  const { status } = useParams();
  const { leads, leadsLoading, agents } = useLeadsContext();

  const [leadsByStatus, setLeadsByStatus] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);

  const navigate = useNavigate();
  const [agent, setAgent] = useState("All");
  const [priority, setPriority] = useState("Select");
  const [timeToClose, setTimeToClose] = useState(false);

  function filterAndSortLeads() {
    if (!leadsLoading && leads.length > 0 && status !== undefined) {
      const initialFiltered =
        status === "All"
          ? leads
          : leads.filter((lead) => lead.status === status);

      const filtered = initialFiltered.filter((lead) => {
        const agentMatch =
          agent === "All" ||
          agents.find((agentObj) => agentObj._id === lead.salesAgent)?.name ===
            agent;

        const priorityMatch =
          priority === "Select" || lead.priority === priority;

        return agentMatch && priorityMatch;
      });

      const sorted = timeToClose
        ? [...filtered].sort((a, b) => a.timeToClose - b.timeToClose)
        : filtered;

      setLeadsByStatus(initialFiltered);
      setFilteredLeads(sorted);
    }
  }

  useEffect(() => {
    filterAndSortLeads();
  }, [leads, leadsLoading, status, agent, priority, timeToClose, agents]);

  return (
    <div>
      <NavBar title="Lead List by Status" />
      <main className="main">
        <SideBar showOnlyBackButton={true} />
        <div className="content">
          <section className="card">
            <h3>Status: {status}</h3>
            <div className="lead-list">
              {leadsLoading ? (
                <p>Loading leads...</p>
              ) : filteredLeads.length === 0 ? (
                <p>No leads found for this status.</p>
              ) : (
                <div className="lead-card-main">
                  {filteredLeads.map((lead, index) => {
                    const agent = agents.find(
                      (agentObj) => agentObj._id === lead.salesAgent
                    );
                    return (
                      <div className="lead-card" key={index}>
                        <h3 className="lead-name">{lead.name}</h3>
                        <p>
                          <strong>Sales Agent:</strong>{" "}
                          {agent ? agent.name : "Unknown"}
                        </p>
                        <p>
                          <strong>Source:</strong> {lead.source}
                        </p>
                        <p>
                          <strong>Priority:</strong> {lead.priority}
                        </p>
                        <p>
                          <strong>Tags:</strong>{" "}
                          {lead.tags.length > 0 ? lead.tags.join(", ") : "None"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
          <section className="card">
            {/* Filters */}
            <p className="sectionTitle">Filters:</p>
            <div className="filtersSection">
              <div className="filterItem">
                <label htmlFor="agent">Sales Agent:</label>
                <select
                  id="agent"
                  className="filterSelect"
                  onChange={(e) => setAgent(e.target.value)}
                >
                  <option>All</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent.name}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filterItem">
                <label htmlFor="priority">Priority:</label>
                <select
                  id="priority"
                  className="filterSelect"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Select</option>
                  {PRIORITIES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort */}
            <div className="sortSection">
              <p className="sortTitle">Sort By:</p>
              <div className="sortButtons">
                <button
                  className="sortBtn"
                  onClick={() => {
                    setTimeToClose((prev) => !prev);
                  }}
                >
                  {timeToClose ? "Unsort" : "Time to Close"}
                </button>
              </div>
            </div>
            {/* Add Lead Button */}
            <button className="addBtn" onClick={() => navigate("/leadForm")}>
              Add New Lead
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
