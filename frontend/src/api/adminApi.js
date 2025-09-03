// src/api/adminApi.js
import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/admin";

async function getAllReports() {
  const res = await axios.get(`${API_URL}/reports`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data;
}

async function assignTask(reportId, contractorId) {
  const res = await axios.post(
    `${API_URL}/assign`,
    { reportId, contractorId },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  return res.data;
}

const adminApi = { getAllReports, assignTask };
export default adminApi; // 👈 this matches your index.js
