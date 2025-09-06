import axios from "axios";

// Base URL (local or deployed)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const API_URL = `${BASE_URL}/reports`;

// ✅ Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
});

// ✅ Automatically attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle response errors globally (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      return Promise.reject(new Error("Network Error: Unable to reach server"));
    }
    return Promise.reject(error);
  }
);

// ✅ Get all reports
async function getReports() {
  try {
    const res = await api.get("/");
    return res.data;
  } catch (err) {
    console.error("Error fetching reports:", err);
    throw err;
  }
}

// ✅ Submit report with image support
async function submitReport(data) {
  try {
    const res = await api.post("/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error submitting report:", err);
    throw err;
  }
}

// ✅ Default export
const reportApi = { getReports, submitReport };
export default reportApi;
