import { createContext, useContext, useEffect, useState } from "react";

const LeadsContext = createContext();

const useLeadsContext = () => useContext(LeadsContext);

export default useLeadsContext;

export function LeadsProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  // Fetch leads from backend on mount
  useEffect(() => {
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
  }, []);

  return (
    <LeadsContext.Provider
      value={{
        leads,
        leadsLoading,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
