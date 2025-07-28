import SideBar from "../Components/Sidebar";
import "../CSS/LeadDetail.css";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

export default function LeadDetails() {
  const { data, loading, error } = useFetch("http://localhost:3000/leads", []);
  console.log(data);

  const comments = [
    {
      id: 1,
      author: "John Doe",
      date: "2025-07-25 10:30 AM",
      text: "Reached out, waiting for response...",
    },
  ];

  return (
    <div className="leadManagement">
      <header>
        <h2>
          Lead Management: <span>Lead Name</span>
        </h2>
      </header>
      <main className="mainContent">
        <div className="sidebar">
          <SideBar showOnlyBackButton={true} />
        </div>
        <div className="leadDetails">
          <section className="card">
            <h3>Lead Details</h3>
            <p>
              Lead Name: <span>Lead Name</span>
            </p>
            <p>
              Sales Agent: <span>Lead Name</span>
            </p>
            <p>
              Lead Source: <span>Lead Name</span>
            </p>
            <p>
              Lead Status: <span>Lead Name</span>
            </p>
            <p>
              Priority: <span>Lead Name</span>
            </p>
            <p>
              Time to Close: <span>Lead Name</span>
            </p>
            {/* Edit Lead Details Button */}
            <button className="editBtn">Edit Lead Details</button>
          </section>

          <section className="card">
            <h3>Comments Section</h3>
            <p>Author: </p>
            <p>Comment: </p>
            <input
              type="text"
              className="addnewComment"
              placeholder="Add New Comment...."
            />
            <button className="submitBtn">Submit Comment</button>
          </section>
        </div>
      </main>
    </div>
  );
}
