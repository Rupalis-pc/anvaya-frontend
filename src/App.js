import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import LeadDetails from "./Pages/LeadDetail";
import "../src/App.css";
import LeadList from "./Pages/LeadList";
import AddLeadForm from "./Pages/AddLeadForm.js";
import AddSalesAgent from "./Pages/AddSalesAgent.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leadsDetail" element={<LeadDetails />} />
        <Route path="/leadList" element={<LeadList />} />
        <Route path="/leadForm" element={<AddLeadForm />} />
        <Route path="/salesAgentForm" element={<AddSalesAgent />} />
      </Routes>
    </Router>
  );
}
