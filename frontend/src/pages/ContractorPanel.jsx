import { useEffect, useState } from "react";
import { contractorApi } from "../api"; // ✅ import from centralized index

export default function ContractorPanel() {
  const [tasks, setTasks] = useState([]);
  const [proofs, setProofs] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await contractorApi.getAssignedReports();
        setTasks(res);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
        alert("Failed to fetch tasks.");
      }
    }
    fetchTasks();
  }, []);

  async function handleUpload(reportId) {
    const file = proofs[reportId];
    if (!file) return alert("Please upload a photo first!");
    try {
      await contractorApi.uploadCompletionProof(reportId, file);
      alert("Proof uploaded successfully!");
      setProofs((prev) => ({ ...prev, [reportId]: null }));
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-heading font-bold mb-4 text-primary">
        Assigned Tasks
      </h2>
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks assigned.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="card p-4 border rounded shadow-sm">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProofs({ ...proofs, [task._id]: e.target.files[0] })
                }
                className="input mt-2"
              />
              <button
                onClick={() => handleUpload(task._id)}
                className="btn btn-accent mt-3"
              >
                Upload Proof
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
