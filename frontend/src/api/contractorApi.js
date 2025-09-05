// src/api/contractorApi.js
import axios from "axios";

// Automatically switch between local and deployed backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const API_URL = `${BASE_URL}/contractor`;

// ✅ Fetch reports assigned to the contractor
async function getAssignedReports() {
  const res = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
}

// ✅ Upload proof of task completion
async function uploadCompletionProof(reportId, file) {
  const formData = new FormData();
  formData.append("proof", file);

  const res = await axios.post(`${API_URL}/tasks/${reportId}/complete`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

// ✅ Default export
const contractorApi = { getAssignedReports, uploadCompletionProof };
export default contractorApi;
