import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center shadow">
      <Link to="/" className="font-heading font-bold text-lg">
        Civic Platform
      </Link>
      <div className="space-x-4">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/submit" className="nav-link">Report</Link>
        <Link to="/reports" className="nav-link">Reports</Link>
        <Link to="/contractor" className="nav-link">Contractor Panel</Link>
      </div>
    </nav>
  );
}
