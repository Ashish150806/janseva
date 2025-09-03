// src/api/authApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/auth";

async function login(email, password) {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
}

async function register(data) {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
}

const authApi = { login, register };
export default authApi;   // 👈 so "import authApi from './authApi'" works
