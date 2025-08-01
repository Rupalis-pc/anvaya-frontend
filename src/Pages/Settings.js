import { useState } from "react";
import "../CSS/Settings.css";
import SalesAgentManagement from "./SalesAgentManagement";
import LeadList from "./LeadList";
import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Agent");

  return (
    <div>
      <NavBar title="Settings" />
      <main className="main">
        <SideBar showOnlyBackButton={true} />
        <div className="content">
          <div className="settings-container">
            <div className="tabs">
              <button
                className={activeTab === "Agent" ? "tab active" : "tab"}
                onClick={() => setActiveTab("Agent")}
              >
                Agent
              </button>
              <button
                className={activeTab === "Lead" ? "tab active" : "tab"}
                onClick={() => setActiveTab("Lead")}
              >
                Lead
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "Agent" && (
                <SalesAgentManagement
                  hideNavAndSideBar={true}
                  showDeleteBtn={true}
                />
              )}
              {activeTab === "Lead" && (
                <LeadList hideNavAndSideBar={true} showDeleteBtn={true} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
