import { createContext, useContext, useEffect, useState } from "react";

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
    fetch("https://anvaya-backend-two.vercel.app/leads")
      .then((res) => res.json())
      .then((data) => {
        setLeads(data);
      })
      .catch(() => setLeads([]))
      .finally(() => {
        setLeadsLoading(false);
      });
  }

  function fetchAllAgents() {
    setAgentsLoading(true);
    fetch("https://anvaya-backend-two.vercel.app/agents")
      .then((res) => res.json())
      .then((data) => {
        setAgents(data);
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
