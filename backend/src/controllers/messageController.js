import Comment from "../../models/Comment.js";

export async function postComment(req, res, next) {
  try {
    const { reportId, text, isAnonymous = false } = req.body;
    const doc = await Comment.create({
      report: reportId,
      author: isAnonymous ? undefined : req.user?.id,
      isAnonymous,
      text,
      approved: isAnonymous ? false : true // non-anon auto-visible
    });
    res.status(201).json(doc);
  } catch (e) { next(e); }
}

export async function approveComment(req, res, next) {
  try {
    const c = await Comment.findByIdAndUpdate(
      req.params.id,
      { approved: true, approvedBy: req.user.id },
      { new: true }
    );
    if (!c) return res.status(404).json({ message: "Not found" });
    res.json(c);
  } catch (e) { next(e); }
}

export async function listComments(req, res, next) {
  try {
    const { reportId } = req.query;
    const q = { approved: true };
    if (reportId) q.report = reportId;
    const items = await Comment.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) { next(e); }
}
