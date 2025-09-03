import { createContext, useState, useEffect } from "react";
import { login as loginApi, register as registerApi } from "../api/authApi";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      // Load user profile from token if backend supports it
      setUser({ role: localStorage.getItem("role") || "user" });
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await loginApi(email, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    setUser(data.user);
  };

  const register = async (formData) => {
    const data = await registerApi(formData);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
