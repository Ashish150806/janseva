import nodemailer from "nodemailer";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can also use: host, port, secure for custom SMTP
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email app password
  },
});

// Verify transporter configuration (optional, good for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email server connection error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

/**
 * Send OTP email
 * @param {string} to - Recipient email address
 * @param {string} otp - One-time password
 */
export async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"JanSeva Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #2E86C1;">Welcome to JanSeva 👋</h2>
        <p style="font-size: 16px;">Please use the following OTP to verify your account:</p>
        <h1 style="color:#2E86C1; letter-spacing: 2px;">${otp}</h1>
        <p style="font-size: 14px; color: #555;">
          This OTP will expire in <strong>10 minutes</strong>.
        </p>
        <br/>
        <p style="font-size: 14px; color: #777;">If you didn’t request this, you can safely ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
