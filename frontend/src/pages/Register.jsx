import { useState } from "react";
import authApi from "../api/authApi";

export default function RegisterWithOtp() {
  const [step, setStep] = useState("register"); // 'register' or 'otp'
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "citizen" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // 1️⃣ Handle Registration
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(form);
      alert("OTP sent to your email! Please verify.");
      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Registration failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  // 2️⃣ Handle OTP Verification
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.verifyOtp({ email: form.email, otp });
      localStorage.setItem("token", res.token);
      alert("OTP verified! You are now logged in.");
      // Optional: redirect to dashboard/home
    } catch (err) {
      console.error(err);
      alert("OTP verification failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 text-center">
        {step === "register" ? "Register" : "Verify OTP"}
      </h2>

      {step === "register" ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input w-full"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <select
            className="input w-full"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="citizen">Citizen</option>
            <option value="official">Official</option>
            <option value="contractor">Contractor</option>
          </select>
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-semibold ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="input w-full"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-semibold ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
}
