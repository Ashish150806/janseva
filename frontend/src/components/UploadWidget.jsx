import { useState } from "react";

export default function UploadWidget({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Please select a file first!");
    onUpload(file);
    setFile(null);
  };

  return (
    <div className="card w-full max-w-md mx-auto">
      <h3 className="text-lg font-heading font-bold mb-3">Upload Proof</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="input"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className={`btn btn-accent mt-3 ${!file ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {file ? "Upload" : "Select a file"}
      </button>
    </div>
  );
}
