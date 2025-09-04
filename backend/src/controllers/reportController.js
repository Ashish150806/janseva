import Report from "../models/report.js";
import { toLocation } from "../utils/geoUtils.js";
import { notify } from "../utils/notifier.js";

export async function createReport(req, res, next) {
  try {
    const { title, description, category, lat, lng, address } = req.body;
    const location = toLocation(Number(lat), Number(lng), address);
    const payload = {
      title, description, category, location,
      imageUrl: req.uploadedUrl || undefined,
      createdBy: req.user?.id || null
    };
    const report = await Report.create(payload);
    res.status(201).json(report);
  } catch (e) { next(e); }
}

export async function listReports(req, res, next) {
  try {
    const { status, category } = req.query;
    const q = {};
    if (status) q.status = status;
    if (category) q.category = category;
    const reports = await Report.find(q).sort({ createdAt: -1 });
    res.json(reports);
  } catch (e) { next(e); }
}

export async function getReport(req, res, next) {
  try {
    const r = await Report.findById(req.params.id);
    if (!r) return res.status(404).json({ message: "Not found" });
    res.json(r);
  } catch (e) { next(e); }
}

export async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const report = await Report.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );
    if (!report) return res.status(404).json({ message: "Not found" });
    if (report.createdBy) await notify(report.createdBy, "status_update", { reportId: report._id, status });
    res.json(report);
  } catch (e) { next(e); }
}
