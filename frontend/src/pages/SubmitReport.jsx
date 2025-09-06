import { useState } from "react";
import reportApi from "../api/reportApi";

export default function SubmitReport() {
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ You must be logged in to submit a report!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      if (form.image) data.append("image", form.image);

      // Submit report via API (token auto-attached via interceptor)
      await reportApi.submitReport(data);

      alert("✅ Report submitted successfully!");
      setForm({ title: "", description: "", image: null }); // reset form
    } catch (err) {
      console.error("Submit error:", err);
      alert("❌ Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 card p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-primary">Submit Report</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
