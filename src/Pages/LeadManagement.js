import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLeadsContext from "../Context/useContext";
import "../CSS/LeadDetail.css";
import useFetch from "../useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { API_ENDPOINT } from "../Common/helper";
import DashboardLayout from "../Components/DashboardLayout";

export default function LeadManagement() {
  const { id } = useParams();
  const { leads, leadsLoading, agents } = useLeadsContext();
  const [leadData, setLeadData] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const navigate = useNavigate();
  const {
    data = [],
    loading,
    error,
    fetchData,
  } = useFetch(`${API_ENDPOINT}/leads/${id}/comments`, []);
  console.log("data", data);
  useEffect(() => {
    if (leads) {
      const leadDetail = leads.find((lead) => lead._id == id);
      setLeadData(leadDetail);
    }
  }, [id, leads, agents]);

  function handleSubmitComment() {
    if (!selectedAuthor || !commentText.trim()) {
      toast.error("Please select an author and write a comment.");
      return;
    }

    fetch(`${API_ENDPOINT}/leads/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lead: id,
        author: selectedAuthor,
        commentText,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit comment");
        return res.json();
      })
      .then(() => {
        fetchData();
        setCommentText("");
        toast.success("Comment added successfully!");
      })
      .catch((err) => {
        console.error("Error submitting comment:", err);
        toast.error("Failed to submit comment. Please try again.");
      });
  }

  return (
    <DashboardLayout
      title={`Lead Management ${leadData?.name ? `: ${leadData?.name}` : ""}`}
      showOnlyBackButton={true}
    >
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
                    Sales Agent:{" "}
                    <span>
                      {agents?.find(
                        (agent) => agent._id === leadData.salesAgent
                      )?.name || ""}
                    </span>
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
                <>
                  <div>
                    <p>
                      Author:{" "}
                      {agents?.find((agent) => agent._id === ele.author)
                        ?.name || ""}
                    </p>
                    <p style={{ fontSize: "0.90rem" }}>
                      Comment: {ele.commentText}
                    </p>
                    <small>
                      Posted on:{" "}
                      {new Date(ele.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </small>
                  </div>
                  <br />
                </>
              ))}

              <hr />
              <label>
                Select Author:{" "}
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="selectAuthor"
                >
                  <option value="">-- Select Agent --</option>
                  {agents?.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </label>

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
    </DashboardLayout>
  );
}
