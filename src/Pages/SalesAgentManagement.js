import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import Loader from "../Components/Loader";
import useLeadsContext from "../Context/useContext";
import "../CSS/SalesAgentManagement.css";

function SalesAgentManagement(props) {
  const { agentsLoading, agents, fetchAllAgents } = useLeadsContext();
  const hideNavAndSideBar = props.hideNavAndSideBar || false;
  const navigate = useNavigate();

  async function deleteAgent(id) {
    try {
      const response = await fetch(
        `https://anvaya-backend-two.vercel.app/agents/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response) {
        fetchAllAgents();
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      {!hideNavAndSideBar && <NavBar title="Sales Agent Management" />}
      <main className="main">
        {!hideNavAndSideBar && <SideBar showOnlyBackButton={true} />}
        <div className="agentListSection">
          <section className="card">
            <h3>Sales Agent List</h3>
            {agentsLoading && <Loader />}
            {agents.map((agent, i) => (
              <div className="agentCard" key={agent._id || i}>
                <div className="agentIndex">{i + 1}.</div>
                <div className="agentDetails">
                  <div className="agentName">{agent.name}</div>
                  <div className="agentEmail">{agent.email}</div>
                </div>
                {props.showDeleteBtn && (
                  <div className="agentActions">
                    <button
                      className="deleteBtn"
                      onClick={() => deleteAgent(agent._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </section>
          <button
            className="addBtn"
            onClick={() => navigate("/salesAgentForm")}
          >
            Add New Agent
          </button>
        </div>
      </main>
    </div>
  );
}

export default SalesAgentManagement;
