import { useState } from "react";
import api from "../api";

export default function SubmitReport() {
  const [form, setForm] = useState({ title: "", description: "", image: null });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.image) data.append("image", form.image);

    try {
      await api.post("/reports", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Report submitted!");
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h2 className="text-xl font-bold mb-4 text-primary">Submit Report</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="input"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="input"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
}
