// src/api/authApi.js
import axios from "axios";

// Automatically switch between local and deployed backend
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
const API_URL = `${BASE_URL}/auth`;

// ✅ Register
async function register(data) {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
}

// ✅ Verify OTP
async function verifyOtp(data) {
  const res = await axios.post(`${API_URL}/verify-otp`, data);
  return res.data;
}

// ✅ Login
async function login(email, password) {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
}

// ✅ Default export
const authApi = { register, verifyOtp, login };
export default authApi;
