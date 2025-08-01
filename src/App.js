import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import "../src/App.css";
import LeadList from "./Pages/LeadList";
import AddLeadForm from "./Pages/AddLeadForm.js";
import AddSalesAgent from "./Pages/AddSalesAgent.js";
import SalesAgentManagement from "./Pages/SalesAgentManagement.js";
import Reports from "./Pages/Reports.js";
import { LeadsProvider } from "./Context/useContext.js";
import LeadManagement from "./Pages/LeadManagement.js";
import LeadsByStatus from "./Pages/LeadsByStatus.js";
import Settings from "./Pages/Settings.js";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <LeadsProvider>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lead/:id" element={<LeadManagement />} />
          <Route path="/leads/:status" element={<LeadsByStatus />} />
          <Route path="/leadList" element={<LeadList />} />
          <Route path="/leadForm" element={<AddLeadForm isEdit={false} />} />
          <Route
            path="/lead/edit/:id"
            element={<AddLeadForm isEdit={true} />}
          />
          <Route path="/salesAgentForm" element={<AddSalesAgent />} />
          <Route
            path="/salesAgentManagement"
            element={<SalesAgentManagement showDeleteBtn={false} />}
          />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </LeadsProvider>
  );
}
