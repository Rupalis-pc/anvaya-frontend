import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import useLeadsContext from "../Context/useContext";
import "../CSS/SalesAgentManagement.css";
import { API_ENDPOINT } from "../Common/helper";
import DashboardLayout from "../Components/DashboardLayout";

function SalesAgentManagement(props) {
  const { agentsLoading, agents, fetchAllAgents } = useLeadsContext();
  const hideNavAndSideBar = props.hideNavAndSideBar || false;
  const navigate = useNavigate();

  async function deleteAgent(id) {
    try {
      const response = await fetch(`${API_ENDPOINT}/agents/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Agent deleted successfully");
        fetchAllAgents();
      } else {
        toast.error("Failed to delete agent");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  const contentUI = (
    <>
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
      <button className="addBtn" onClick={() => navigate("/salesAgentForm")}>
        Add New Agent
      </button>
    </>
  );

  return hideNavAndSideBar ? (
    <div className="content">{contentUI}</div>
  ) : (
    <DashboardLayout title="Sales Agent Management" showOnlyBackButton={true}>
      {contentUI}
    </DashboardLayout>
  );
}

export default SalesAgentManagement;
