import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SubmitReport from "./pages/SubmitReport";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";
import ContractorPanel from "./pages/ContractorPanel";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/submit" element={<SubmitReport />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contractor" element={<ContractorPanel />} />
      </Routes>
    </Layout>
  );
}
