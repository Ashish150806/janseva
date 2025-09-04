import jwt from "jsonwebtoken";
import User from "../models/user.js";

function sign(user) {
  return jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role = "citizen" } = req.body;
    if (!name || !password) throw new Error("Name and password required");
    const existing = email ? await User.findOne({ email }) : null;
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password, role });
    const token = sign(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = sign(user);
    res.json({ token, user: { id: user._id, name: user.name, role: user.role, email: user.email } });
  } catch (e) { next(e); }
}
