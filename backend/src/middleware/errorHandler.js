export default function errorHandler(err, req, res, _next) {
  console.error("=== ERROR HANDLER START ===");
  console.error("Name:", err.name);
  console.error("Message:", err.message);
  console.error("Status:", err.status || 500);
  console.error("Stack:", err.stack);
  console.error("Full Error Object:", JSON.stringify(err, null, 2));
  console.error("--- Request Context ---");
  console.error("Method:", req.method);
  console.error("URL:", req.originalUrl);
  console.error("Headers:", req.headers);
  console.error("Params:", req.params);
  console.error("Query:", req.query);
  console.error("Body:", req.body);
  console.error("=== ERROR HANDLER END ===");

  const status = err.status || 500;
  res.status(status).json({ message: err.message || "Server error" });
}
