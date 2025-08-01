import { Link } from "react-router-dom";
import "../CSS/DashboardLayout.css";

export default function DashboardLayout({
  title = "Anvaya CRM Dashboard",
  showOnlyBackButton = false,
  children,
}) {
  return (
    <div>
      <NavBar title={title} />
      <main className="main">
        <SideBar showOnlyBackButton={showOnlyBackButton} />
        <div className="content">{children}</div>
      </main>
    </div>
  );
}

function NavBar({ title }) {
  return (
    <header>
      <h2>{title}</h2>
    </header>
  );
}

function SideBar({ showOnlyBackButton }) {
  if (showOnlyBackButton) {
    return (
      <div className="sidebar">
        <Link className="backBtn" to="/">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/leadlist">Leads</Link>
        </li>
        <li>
          <Link to="/">Sales</Link>
        </li>
        <li>
          <Link to="/salesAgentManagement">Agents</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
