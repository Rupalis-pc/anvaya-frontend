import "../CSS/LeadList.css";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import useLeadsContext from "../Context/useContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LeadList(props) {
  const { leads, leadsLoading, agents, fetchAllLeads } = useLeadsContext();
  const navigate = useNavigate();
  const [status, setStatus] = useState("All");
  const [agent, setAgent] = useState("All");
  const [priority, setPriority] = useState(false);
  const [timeToClose, setTimeToClose] = useState(false);
  const hideNavAndSideBar = props.hideNavAndSideBar || false;

  const statusOptions = [
    "All",
    "New",
    "Qualified",
    "Contacted",
    "Proposal Sent",
    "Closed",
  ];

  async function deleteLead(id) {
    try {
      const response = await fetch(
        `https://anvaya-backend-two.vercel.app/leads/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response) {
        fetchAllLeads();
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  }

  function filter() {
    const filterLeads = leads.filter((lead) => {
      const statusMatch = status === "All" || lead.status === status;
      const agentMatch =
        agent === "All" ||
        agents.find((agent) => agent._id === lead.salesAgent)?.name === agent;

      return statusMatch && agentMatch;
    });

    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };

    if (priority) {
      filterLeads.sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    } else if (timeToClose) {
      filterLeads.sort((a, b) => a.timeToClose - b.timeToClose);
    }

    return filterLeads;
  }

  const filteredLeads = filter();

  return (
    <div>
      {!hideNavAndSideBar && <NavBar title="Lead List" />}
      <main className="main">
        {!hideNavAndSideBar && <SideBar showOnlyBackButton={true} />}
        <div className="content">
          <section className="card">
            <h3>Lead Overview</h3>
            {filteredLeads.map((lead, index) => (
              <div className="leadCard" key={index}>
                <div className="leadHeader">
                  <span className="leadName">{lead.name}</span>
                  {props.showDeleteBtn ? (
                    <button
                      className="deleteBtn"
                      onClick={() => deleteLead(lead._id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <span
                      className={`statusTag ${lead.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {lead.status}
                    </span>
                  )}
                </div>
                <div className="details">
                  <p>
                    <strong>Sales Agent:</strong>{" "}
                    {
                      agents.find(
                        (agentObj) => agentObj._id === lead.salesAgent
                      )?.name
                    }
                  </p>
                  <p>
                    <strong>Source:</strong> {lead.source}
                  </p>
                </div>
              </div>
            ))}
          </section>
          <section className="card">
            {/* Filters */}
            <p className="sectionTitle">Filters:</p>
            <div className="filtersSection">
              <div className="filterItem">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  className="filterSelect"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
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
            </div>

            {/* Sort */}
            <div className="sortSection">
              <p className="sortTitle">Sort By:</p>
              <div className="sortButtons">
                <button
                  className="sortBtn"
                  onClick={() => {
                    setPriority(true);
                    setTimeToClose(false);
                  }}
                >
                  Priority
                </button>
                <button
                  className="sortBtn"
                  onClick={() => {
                    setTimeToClose(true);
                    setPriority(false);
                  }}
                >
                  Time to Close
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
