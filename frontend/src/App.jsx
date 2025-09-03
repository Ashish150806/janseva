import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitReport from "./pages/SubmitReport";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600 text-white p-4 flex justify-between">
        <Link to="/">Home</Link>
        <div className="space-x-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/submit">Report</Link>
          <Link to="/reports">Reports</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<h1 className="p-6">Welcome to Civic Issue Platform</h1>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}
