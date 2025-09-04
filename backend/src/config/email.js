// config/email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // use Gmail service
  auth: {
    user: "hussainabbaszaidi7@gmail.com",
    pass: "ggtmqufrakvarliz",
  },
});

transporter.verify((err, success) => {
  if (err) console.error("❌ Email server error:", err);
  else console.log("✅ Email server ready");
});

export default transporter;