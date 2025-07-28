import { useState } from "react";
import "../CSS/AddLeadForm.css";

export default function AddLeadForm() {
  const leadSources = [
    "Website",
    "Referral",
    "Cold Call",
    "Advertisement",
    "Email",
    "Other",
  ];
  const salesAgents = ["John Doe", "Jane Smith", "Mark Johnson"];
  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  const priorities = ["High", "Medium", "Low"];
  const tagsList = ["High Value", "Follow-up", "Urgent"];

  return (
    <div className="addLeadContainer">
      <h2>Add New Lead</h2>
      <form className="addLeadForm">
        <label>
          Lead Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Lead Source:
          <select name="source" required>
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
          <select multiple>
            {salesAgents.map((agent) => (
              <option key={agent} value={agent}>
                {agent}
              </option>
            ))}
          </select>
        </label>

        <label>
          Lead Status:
          <select name="status">
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priority:
          <select name="priority">
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label>
          Time to Close (Days):
          <input type="number" name="timeToClose" required />
        </label>

        <label>
          Tags:
          <select multiple>
            {tagsList.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="createLeadBtn">
          Create Lead
        </button>
      </form>
    </div>
  );
}
