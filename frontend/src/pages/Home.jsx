import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-heading font-bold mb-4 text-primary">
        Welcome to Civic Issue Platform
      </h1>
      <p className="mb-6 text-gray-600 max-w-lg mx-auto">
        Report civic issues, track their status, and help improve your city.
      </p>
      <div className="space-x-4">
        <Link to="/submit" className="btn btn-primary">Submit a Report</Link>
        <Link to="/reports" className="btn btn-secondary">View Reports</Link>
      </div>
    </div>
  );
}
