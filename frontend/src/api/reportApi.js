// src/api/reportApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/reports";

async function getReports() {
  const res = await axios.get(API_URL);
  return res.data;
}

async function submitReport(data, token) {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

const reportApi = { getReports, submitReport };
export default reportApi;   // 👈 default export
