import Report from "../models/report.js";
import User from "../models/user.js";
import { hotspotByGrid, slaStats } from "../utils/analyticsUtils.js";
import { notify } from "../utils/notifier.js";

export async function allReports(req, res, next) {
  try {
    const { status, category, assigned } = req.query;
    const q = {};
    if (status) q.status = status;
    if (category) q.category = category;
    if (assigned === "true") q.assignedTo = { $ne: null };
    if (assigned === "false") q.assignedTo = null;
    const reports = await Report.find(q).populate("assignedTo", "name company");
    res.json(reports);
  } catch (e) { next(e); }
}

export async function assignReport(req, res, next) {
  try {
    const { reportId, contractorId } = req.body;
    const contractor = await User.findOne({ _id: contractorId, role: "contractor" });
    if (!contractor) return res.status(400).json({ message: "Invalid contractor" });
    const report = await Report.findByIdAndUpdate(
      reportId,
      { assignedTo: contractorId, status: "assigned" },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    await notify(contractorId, "assignment", { reportId: report._id });
    res.json(report);
  } catch (e) { next(e); }
}

export async function approveCompletion(req, res, next) {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Not found" });
    report.status = "resolved";
    await report.save();
    if (report.createdBy) await notify(report.createdBy, "status_update", { reportId: report._id, status: "resolved" });
    res.json(report);
  } catch (e) { next(e); }
}

export async function analytics(req, res, next) {
  try {
    const [hotspots, sla] = await Promise.all([hotspotByGrid({ size: 0.05 }), slaStats()]);
    res.json({ hotspots, sla });
  } catch (e) { next(e); }
}
