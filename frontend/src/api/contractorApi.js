// src/api/contractorApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/contractor";

async function getAssignedReports() {
  const res = await axios.get(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
}

async function uploadCompletionProof(reportId, file) {
  const formData = new FormData();
  formData.append("proof", file);

  const res = await axios.post(
    `${API_URL}/tasks/${reportId}/complete`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

const contractorApi = { getAssignedReports, uploadCompletionProof };
export default contractorApi;   // 👈 default export so imports match
