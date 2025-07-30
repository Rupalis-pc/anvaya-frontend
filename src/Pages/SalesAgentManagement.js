import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import Loader from "../Components/Loader";
import useLeadsContext from "../Context/useContext";
import "../CSS/SalesAgentManagement.css";

function SalesAgentManagement() {
  const { agentsLoading, agents } = useLeadsContext();

  const navigate = useNavigate();

  return (
    <div>
      <NavBar title="Sales Agent Management" />
      <main className="main">
        <SideBar showOnlyBackButton={true} />
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
