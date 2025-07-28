import { Link } from "react-router-dom";
import "../CSS/LeadList.css";
import useFetch from "../useFetch";
import SideBar from "../Components/Sidebar";

export default function LeadList() {
  const { data, loading, error } = useFetch("http://localhost:3000/leads", []);

  return (
    <div>
      <header>
        <h2>Lead List</h2>
      </header>
      <main className="mainContent">
        <SideBar showOnlyBackButton={true} />
        <div className="leadOverview">
          <section className="card">
            <h3>Lead Overview</h3>
            {data.map((lead) => (
              <div className="leadItem" key={lead.id}>
                {lead.name} - {lead.status} - {lead.salesAgent}
              </div>
            ))}
          </section>
          <section className="card">
            {/* Filters */}
            <div className="filters">
              <label>
                Status:
                <select>
                  <option>All</option>
                  <option>New</option>
                  <option>Qualified</option>
                </select>
              </label>
              <label>
                Sales Agent:
                <select>
                  <option>All</option>
                  <option>John Doe</option>
                  <option>Jane</option>
                  <option>Mark</option>
                </select>
              </label>
            </div>
            {/* Sort */}
            <div className="sort">
              <p>Sort By:</p>
              <button>Priority</button>
              <button>Time to Close</button>
            </div>
            {/* Add Lead Button */}
            <button className="addBtn">Add New Lead</button>
          </section>
        </div>
      </main>
    </div>
  );
}
