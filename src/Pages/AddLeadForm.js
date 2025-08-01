import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardLayout from "../Components/DashboardLayout";
import useLeadsContext from "../Context/useContext";
import {
  API_ENDPOINT,
  LEAD_STATUS,
  PRIORITIES,
  TAGS_LIST,
} from "../Common/helper";
import "../CSS/AddLeadForm.css";

export default function AddLeadForm(props) {
  const { agents, fetchAllLeads, leads } = useLeadsContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = props.isEdit;

  const [formData, setFormData] = useState({
    leadName: "",
    leadSource: "",
    salesAgent: "",
    leadStatus: "",
    priority: "High",
    timeToClose: "",
    tags: [],
  });

  useEffect(() => {
    if (leads) {
      const leadDetail = leads.find((lead) => lead._id == id);
      if (leadDetail) {
        setFormData({
          leadName: leadDetail.name,
          leadSource: leadDetail.source,
          salesAgent: leadDetail.salesAgent,
          leadStatus: leadDetail.status,
          tags: leadDetail.tags,
          timeToClose: leadDetail.timeToClose,
          priority: leadDetail.priority,
        });
      }
    }
  }, [id, leads]);

  const leadSources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];

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
    const URL = isEdit
      ? `${API_ENDPOINT}/leads/${id}`
      : `${API_ENDPOINT}/leads`;

    fetch(URL, {
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
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit lead");
        }
        return res.json();
      })
      .then(() => {
        toast.success(
          isEdit ? "Lead updated successfully!" : "New lead added!"
        );
        fetchAllLeads();
        navigate("/leadlist");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong while submitting the lead.");
      });
  }

  return (
    <DashboardLayout title="Anvaya CRM Dashboard" showOnlyBackButton={true}>
      <div className="addLeadContainer">
        <h2>{isEdit ? "Update Lead" : "Add New Lead"}</h2>
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
              {LEAD_STATUS.map((status) => (
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
              {PRIORITIES.map((priority) => (
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
              {TAGS_LIST.map((tag) => (
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
            {isEdit ? "Update Lead" : "Create Lead"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
