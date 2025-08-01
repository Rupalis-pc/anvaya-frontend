import { useEffect, useState } from "react";
import SideBar from "../Components/Sidebar";
import useLeadsContext from "../Context/useContext";
import "../CSS/LeadDetail.css";
import useFetch from "../useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import NavBar from "../Components/Navbar";

export default function LeadManagement() {
  const { id } = useParams();
  const { leads, leadsLoading, agents } = useLeadsContext();
  const [leadData, setLeadData] = useState(null);
  const [agentName, setAgentName] = useState(null);
  const [commentText, setCommentText] = useState("");

  const navigate = useNavigate();
  const { data, loading, error, fetchData } = useFetch(
    `https://anvaya-backend-two.vercel.app/leads/${id}/comments`,
    []
  );

  useEffect(() => {
    if (leads) {
      const leadDetail = leads.find((lead) => lead._id == id);
      setLeadData(leadDetail);
      const agent = agents?.find(
        (agent) => agent._id === leadDetail.salesAgent
      )?.name;
      setAgentName(agent || "");
    }
  }, [id, leads, agents]);

  // /leads/:id/comments
  function handleSubmitComment() {
    fetch(`https://anvaya-backend-two.vercel.app/leads/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentText,
        author: leadData.salesAgent,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchData();
        setCommentText("");
      })
      .catch((err) => console.error("Failed to add product to Cart", err));
  }

  return (
    <div>
      <NavBar
        title={`Lead Management ${leadData?.name ? `: ${leadData?.name}` : ""}`}
      />
      <main className="main">
        <div className="sidebar">
          <SideBar showOnlyBackButton={true} />
        </div>
        <div className="leadDetails">
          {leadsLoading ? (
            <Loader />
          ) : (
            <>
              <section className="card">
                <h3>Lead Details</h3>
                {leadData ? (
                  <>
                    <p>
                      Lead Name: <span>{leadData?.name}</span>
                    </p>
                    <p>
                      Sales Agent: <span>{agentName || ""}</span>
                    </p>
                    <p>
                      Lead Source: <span>{leadData?.source}</span>
                    </p>
                    <p>
                      Lead Status: <span>{leadData?.status}</span>
                    </p>
                    <p>
                      Priority: <span>{leadData?.priority}</span>
                    </p>
                    <p>
                      Time to Close: <span>{leadData?.timeToClose} days</span>
                    </p>
                    <p>
                      Tags: <span>{leadData?.tags.join(", ")}</span>
                    </p>

                    <button
                      className="editBtn"
                      onClick={() => navigate(`/lead/edit/${leadData._id}`)}
                    >
                      Edit Lead Details
                    </button>
                  </>
                ) : (
                  <div>No Lead Data Found</div>
                )}
              </section>

              <section className="card">
                <h3>Comments Section</h3>
                {loading && <Loader />}
                {data?.map((ele) => (
                  <div>
                    <p>Author: {agentName}</p>
                    <p>Comment: {ele.commentText}</p>
                  </div>
                ))}

                <input
                  type="text"
                  className="addnewComment"
                  placeholder="Add New Comment...."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  type="button"
                  className="submitBtn"
                  onClick={handleSubmitComment}
                >
                  Submit Comment
                </button>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
