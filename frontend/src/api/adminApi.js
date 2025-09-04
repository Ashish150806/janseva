// src/api/contractorApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/contractor";

// ✅ Fetch reports assigned to the contractor
export async function getAssignedReports() {
  const res = await axios.get(`${API_URL}/assigned-reports`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
}

// ✅ Upload proof of task completion
export async function uploadCompletionProof(reportId, proofFile) {
  const formData = new FormData();
  formData.append("proof", proofFile);

  const res = await axios.post(`${API_URL}/upload-proof/${reportId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
