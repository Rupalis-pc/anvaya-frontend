import { Link } from "react-router-dom";

function SideBar(props) {
  if (props.showOnlyBackButton) {
    return (
      <div className="sidebar">
        <Link className="backBtn" to="/">
          ← Back to Dashbord
        </Link>
      </div>
    );
  }

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/leadlist">→ Leads</Link>
        </li>
        <li>
          <Link to="/leadlist">→ Sales</Link>
        </li>
        <li>
          <Link to="/salesAgent">→ Agents</Link>
        </li>
        <li>
          <Link to="/leadlist">→ Reports</Link>
        </li>
        <li>
          <Link to="/leadlist">→ Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
