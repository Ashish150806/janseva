import { useEffect, useState } from "react";
import { getAllReports, assignTask } from "../api/adminApi";

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [contractorId, setContractorId] = useState("");

  useEffect(() => {
    async function fetchReports() {
      const res = await getAllReports();
      setReports(res);
    }
    fetchReports();
  }, []);

  async function handleAssign(reportId) {
    if (!contractorId) return alert("Enter contractor ID first");
    try {
      await assignTask(reportId, contractorId);
      alert("Task assigned!");
    } catch (err) {
      alert("Failed to assign: " + err.message);
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
          {reports.map((r) => (
            <div key={r._id} className="card">
              <h3 className="font-bold">{r.title}</h3>
              <p className="text-gray-600">{r.description}</p>
              <p className="text-sm text-gray-500">Status: {r.status}</p>
              <div className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  placeholder="Contractor ID"
                  value={contractorId}
                  onChange={(e) => setContractorId(e.target.value)}
                  className="input flex-1"
                />
                <button
                  onClick={() => handleAssign(r._id)}
                  className="btn btn-primary"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
