import { useEffect, useState } from "react";
import { adminApi } from "../api"; // ✅ import from centralized index

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState({});

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await adminApi.getAllReports();
        setReports(res);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        alert("Failed to fetch reports.");
      }
    }
    fetchReports();
  }, []);

  async function handleAssign(reportId, contractorId) {
    if (!contractorId) return alert("Please select a contractor!");
    try {
      await adminApi.assignTask(reportId, contractorId);
      alert("Task assigned successfully!");
      const res = await adminApi.getAllReports();
      setReports(res);
    } catch (err) {
      console.error("Assignment error:", err);
      alert("Failed to assign task: " + err.message);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-heading font-bold mb-4 text-primary">
        Admin Dashboard
      </h2>
      {reports.length === 0 ? (
        <p className="text-gray-600">No reports available.</p>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report._id}
              className="card p-4 border rounded shadow-sm flex flex-col gap-2"
            >
              <h3 className="font-bold text-lg">{report.title}</h3>
              <p className="text-gray-600">{report.description}</p>

              <select
                value={selectedContractor[report._id] || ""}
                onChange={(e) =>
                  setSelectedContractor((prev) => ({
                    ...prev,
                    [report._id]: e.target.value,
                  }))
                }
                className="input mt-2"
              >
                <option value="">Select Contractor</option>
                <option value="contractor1">Contractor 1</option>
                <option value="contractor2">Contractor 2</option>
              </select>

              <button
                onClick={() =>
                  handleAssign(report._id, selectedContractor[report._id])
                }
                className="btn btn-accent mt-2"
              >
                Assign Task
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
