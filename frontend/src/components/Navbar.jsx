import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">Civic Platform</Link>
      <div className="space-x-4">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/submit">Report</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/contractor">Contractor Panel</Link>
      </div>
    </nav>
  );
}
