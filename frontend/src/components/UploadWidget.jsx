export default function UploadWidget({ onFileSelect }) {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileSelect(e.target.files[0])}
        className="border p-2 w-full"
      />
    </div>
  );
}
