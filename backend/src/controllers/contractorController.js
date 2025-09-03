import Report from "../../models/Report.js";

export async function myTasks(req, res, next) {
  try {
    const reports = await Report.find({ assignedTo: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (e) { next(e); }
}

export async function uploadProof(req, res, next) {
  try {
    const report = await Report.findOne({ _id: req.params.id, assignedTo: req.user.id });
    if (!report) return res.status(404).json({ message: "Report not found or not assigned" });
    if (!req.uploadedUrl) return res.status(400).json({ message: "No file uploaded" });

    report.completionProofs.push({ url: req.uploadedUrl, uploadedBy: req.user.id });
    report.status = "completed_pending_review";
    await report.save();
    res.json(report);
  } catch (e) { next(e); }
}
