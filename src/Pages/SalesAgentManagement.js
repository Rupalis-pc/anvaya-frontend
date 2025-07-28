import { useNavigate } from "react-router-dom";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import "../CSS/SalesAgentManagement.css";
import useFetch from "../useFetch";

function SalesAgentManagement() {
  const { data, loading, error } = useFetch(
    "https://anvaya-backend-two.vercel.app/agents",
    []
  );

  const navigate = useNavigate();
  console.log(navigate);

  return (
    <div>
      <NavBar title="Sales Agent Management" />

      <main className="mainContent">
        <SideBar showOnlyBackButton={true} />
        <div className="agentListSection">
          <section className="card">
            <h3>Sales Agent List</h3>
            {data.map((agent) => (
              <div className="agentList">
                Agent: {agent.name} - {agent.email}
              </div>
            ))}
          </section>
          <button className="addBtn" onClick={() => navigate("salesAgentForm")}>
            Add New Agent
          </button>
        </div>
      </main>
    </div>
  );
}

export default SalesAgentManagement;
