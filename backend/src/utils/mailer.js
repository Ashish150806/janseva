import nodemailer from "nodemailer";

// ✅ Create reusable transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,          // Secure port
  secure: true,       // Use TLS
  auth: {
    user: process.env.EMAIL_USER,   // Gmail address
    pass: process.env.EMAIL_PASS,   // App Password (16 chars)
  },
});

// ✅ Verify transporter once at server start
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email server connection error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// ✅ Mask email in logs
const maskEmail = (email) => {
  const [user, domain] = email.split("@");
  return user[0] + "***@" + domain;
};

/**
 * Send OTP email
 * @param {string} to - Recipient email address
 * @param {string} otp - One-time password
 */
export async function sendOtpEmail(to, otp) {
  try {
    const mailOptions = {
      from: `"JanSeva Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Verification Code",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`, // Fallback
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
    console.log(`📧 OTP sent to ${maskEmail(to)}`);
  } catch (error) {
    console.error("❌ Failed to send OTP:", error);
    throw new Error("Could not send verification email. Please try again.");
  }
}

export default transporter;
