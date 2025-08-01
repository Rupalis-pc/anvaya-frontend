import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLeadsContext from "../Context/useContext";
import "../CSS/AddSalesAgent.css";
import { API_ENDPOINT } from "../Common/helper";
import DashboardLayout from "../Components/DashboardLayout";

export default function AddSalesAgent() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { fetchAllAgents } = useLeadsContext();
  const navigate = useNavigate();

  function handleCreateAgent() {
    fetch(`${API_ENDPOINT}/agents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create agent");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Agent created successfully!");
        fetchAllAgents();
        navigate("/salesAgentManagement");
      })
      .catch((err) => {
        console.error("Failed to add agent", err);
        toast.error("Error: Could not create agent.");
      });
  }

  return (
    <DashboardLayout title="Sales Agent Management" showOnlyBackButton={true}>
      <div className="addAgentContainer">
        <h2>Add New Sales Agent</h2>
        <form className="addAgentForm">
          <label>
            Agent Name:
            <input
              value={name}
              type="text"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Email Address:
            <input
              value={email}
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="createAgentBtn"
            onClick={handleCreateAgent}
          >
            Create Agent
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
