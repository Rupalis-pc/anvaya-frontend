import { createContext, useContext, useEffect, useState } from "react";
import { API_ENDPOINT } from "../Common/helper";

const LeadsContext = createContext();

const useLeadsContext = () => useContext(LeadsContext);

export default useLeadsContext;

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [agentsLoading, setAgentsLoading] = useState(false);

  function fetchAllLeads() {
    setLeadsLoading(true);
    fetch(`${API_ENDPOINT}/leads`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLeads([]);
        } else {
          setLeads(data);
        }
      })
      .catch(() => setLeads([]))
      .finally(() => {
        setLeadsLoading(false);
      });
  }

  function fetchAllAgents() {
    setAgentsLoading(true);
    fetch(`${API_ENDPOINT}/agents`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setAgents([]);
        } else {
          setAgents(data);
        }
      })
      .catch(() => setAgents([]))
      .finally(() => {
        setAgentsLoading(false);
      });
  }

  useEffect(() => {
    fetchAllAgents();
    fetchAllLeads();
  }, []);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        leadsLoading,
        agentsLoading,
        agents,
        fetchAllAgents,
        fetchAllLeads,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
