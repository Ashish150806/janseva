import { useEffect, useState } from "react";
import reportApi from "../api/reportApi";
import MapView from "../components/MapView";
import ReportCard from "../components/ReportCard";

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
      <h2 className="text-2xl font-heading font-bold mb-4 text-primary">
        Reported Issues
      </h2>
      <MapView reports={reports} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {reports.map((report) => (
          <ReportCard key={report._id} report={report} />
        ))}
      </div>
    </div>
  );
}
