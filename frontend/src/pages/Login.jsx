import { useState } from "react";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      alert("Login successful!");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Login failed: " + err.response.data.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h2 className="text-xl font-bold mb-4 text-primary">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}
