import { createContext, useState, useEffect } from "react";
import { getReports } from "../api/reportApi";

export const ReportContext = createContext();

export default function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchReports() {
    try {
      setLoading(true);
      const data = await getReports();
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <ReportContext.Provider value={{ reports, fetchReports, loading }}>
      {children}
    </ReportContext.Provider>
  );
}
