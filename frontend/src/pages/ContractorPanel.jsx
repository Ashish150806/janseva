import { useEffect, useState } from "react";
import { getAssignedReports, uploadCompletionProof } from "../api/contractorApi";

export default function ContractorPanel() {
  const [tasks, setTasks] = useState([]);
  const [proofs, setProofs] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      const res = await getAssignedReports();
      setTasks(res);
    }
    fetchTasks();
  }, []);

  async function handleUpload(reportId) {
    if (!proofs[reportId]) return alert("Please upload a photo first!");
    try {
      await uploadCompletionProof(reportId, proofs[reportId]);
      alert("Proof uploaded successfully!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="border rounded p-4 shadow">
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProofs({ ...proofs, [task._id]: e.target.files[0] })
                }
                className="mt-2"
              />
              <button
                onClick={() => handleUpload(task._id)}
                className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
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
