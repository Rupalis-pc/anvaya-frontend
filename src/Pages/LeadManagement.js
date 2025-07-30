import { useEffect, useState } from "react";
import SideBar from "../Components/Sidebar";
import useLeadsContext from "../Context/useContext";
import "../CSS/LeadDetail.css";
import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import NavBar from "../Components/Navbar";

export default function LeadManagement() {
  const { id } = useParams();
  const { leads, leadsLoading } = useLeadsContext();
  const [leadData, setLeadData] = useState(null);

  const { data, loading, error } = useFetch(
    `https://anvaya-backend-two.vercel.app/leads/${id}/comments`,
    []
  );

  useEffect(() => {
    if (leads) {
      const leadDetail = leads.find((lead) => lead._id == id);
      setLeadData(leadDetail);
    }
  }, [id, leads]);

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
                      Sales Agent: <span>{leadData?.salesAgent}</span>
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

                    <button className="editBtn">Edit Lead Details</button>
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
                    <p>Author: </p>
                    <p>Comment: {ele.commentText}</p>
                  </div>
                ))}

                <input
                  type="text"
                  className="addnewComment"
                  placeholder="Add New Comment...."
                />
                <button className="submitBtn">Submit Comment</button>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
