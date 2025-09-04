import { useState } from "react";
import { authApi } from "../api"; // ✅ centralized import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await authApi.login(email, password);
      alert("Login successful!");
      console.log("User data:", res);
      // Store token or redirect user as needed
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + err.message);
    }
  }

  return (
    <form onSubmit={handleLogin} className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Login
      </button>
    </form>
  );
}
