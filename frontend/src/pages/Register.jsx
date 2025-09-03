import { useState } from "react";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "citizen" });

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      alert("Registered successfully!");
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert("Registration failed: " + err.response.data.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="w-full border p-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="citizen">Citizen</option>
          <option value="official">Official</option>
          <option value="contractor">Contractor</option>
        </select>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
