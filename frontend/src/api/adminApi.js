// src/api/adminApi.js
import axios from "axios";

// Automatically switch between local and deployed backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const API_URL = `${BASE_URL}/admin`;

// ✅ Fetch all reports
async function getAllReports() {
  const res = await axios.get(`${API_URL}/reports`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
}

// ✅ Assign a task to a contractor
async function assignTask(reportId, contractorId) {
  const res = await axios.post(
    `${API_URL}/assign/${reportId}`,
    { contractorId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return res.data;
}

// ✅ Default export
const adminApi = { getAllReports, assignTask };
export default adminApi;
