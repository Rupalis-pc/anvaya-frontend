import { useState } from "react";
import "../CSS/AddSalesAgent.css";

export default function AddSalesAgent() {
  return (
    <div className="addAgentContainer">
      <h2>Add New Sales Agent</h2>
      <form className="addAgentForm">
        <label>
          Agent Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Email Address:
          <input type="email" name="email" required />
        </label>

        <button type="submit" className="createAgentBtn">
          Create Agent
        </button>
      </form>
    </div>
  );
}
