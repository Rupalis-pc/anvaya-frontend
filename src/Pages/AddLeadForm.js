import { useState } from "react";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import useLeadsContext from "../Context/useContext";
import "../CSS/AddLeadForm.css";
import { useNavigate } from "react-router-dom";

export default function AddLeadForm() {
  const { agents, fetchAllLeads } = useLeadsContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leadName: "",
    leadSource: "",
    salesAgent: "",
    leadStatus: "",
    priority: "High",
    timeToClose: "",
    tags: [],
  });

  const leadSources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];
  const statuses = ["New", "Contacted", "Qualified"];
  const priorities = ["High", "Medium", "Low"];
  const tagsList = ["High Value", "Follow-up", "Urgent"];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function checkboxHandler(e) {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      tags: checked
        ? [...prev.tags, value]
        : prev.tags.filter((tag) => tag !== value),
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    fetch("https://anvaya-backend-two.vercel.app/leads", {
      method: "POST",
      body: JSON.stringify({
        name: formData.leadName,
        source: formData.leadSource,
        salesAgent: formData.salesAgent,
        status: formData.leadStatus,
        tags: formData.tags,
        timeToClose: formData.timeToClose,
        priority: formData.priority,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        fetchAllLeads();
        navigate("/leadlist");
      })
      .catch((err) => console.log(err));
  }

  function handleSalesAgent(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <NavBar title="Anvaya CRM Dashboard" />
      <main className="main">
        <SideBar showOnlyBackButton={true} />
        <div className="content">
          <div className="addLeadContainer">
            <h2>Add New Lead</h2>
            <form className="addLeadForm" onSubmit={submitHandler}>
              <label>
                Lead Name:
                <input
                  type="text"
                  name="leadName"
                  required
                  value={formData.leadName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Lead Source:
                <select
                  name="leadSource"
                  value={formData.leadSource}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Source</option>
                  {leadSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Sales Agent:
                <select
                  name="salesAgent"
                  value={formData.salesAgent}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Agent</option>
                  {agents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Lead Status:
                <select
                  name="leadStatus"
                  value={formData.leadStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Priority:
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Time to Close (Days):
                <input
                  type="number"
                  name="timeToClose"
                  value={formData.timeToClose}
                  required
                  onChange={handleChange}
                />
              </label>

              <label>
                Tags:
                <div className="checkboxGroup">
                  {tagsList.map((tag) => (
                    <label key={tag} className="checkboxItem">
                      <input
                        type="checkbox"
                        name="tags"
                        value={tag}
                        checked={formData.tags.includes(tag)}
                        onChange={checkboxHandler}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </label>

              <button type="submit" className="createLeadBtn">
                Create Lead
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
