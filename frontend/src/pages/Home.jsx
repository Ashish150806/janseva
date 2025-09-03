import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Civic Issue Platform</h1>
      <p className="mb-6 text-gray-600">
        Report civic issues, track their status, and help improve your city.
      </p>
      <div className="space-x-4">
        <Link to="/submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Submit a Report
        </Link>
        <Link to="/reports" className="bg-gray-800 text-white px-4 py-2 rounded">
          View Reports
        </Link>
      </div>
    </div>
  );
}
