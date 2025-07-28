import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import LeadDetails from "./Pages/LeadDetail";
import "../src/App.css";
import LeadList from "./Pages/LeadList";
import AddLeadForm from "./Pages/AddLeadForm.js";
import AddSalesAgent from "./Pages/AddSalesAgent.js";
import SalesAgentManagement from "./Pages/SalesAgentManagement.js";
import Reports from "./Pages/Reports.js";
import LeadStatus from "./Pages/LeadStatus.js";
import { LeadsProvider } from "./Context/useContext.js";

export default function App() {
  return (
    <LeadsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leadsDetail/:id" element={<LeadDetails />} />
          <Route path="/leadList" element={<LeadList />} />
          <Route path="/leadForm" element={<AddLeadForm />} />
          <Route path="/salesAgentForm" element={<AddSalesAgent />} />
          <Route
            path="/salesAgentManagement"
            element={<SalesAgentManagement />}
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/leadsbystatus" element={<LeadStatus />} />
        </Routes>
      </Router>
    </LeadsProvider>
  );
}
