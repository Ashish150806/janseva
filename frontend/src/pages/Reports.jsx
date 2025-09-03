import { useEffect, useState } from "react";
import reportApi from "../api/reportApi";
import MapView from "../components/MapView";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await reportApi.get("/reports");
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    }
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reported Issues</h2>
      <MapView reports={reports} />
    </div>
  );
}
