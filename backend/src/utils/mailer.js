import transporter from "../config/email.js";

const maskEmail = email => {
  const [user, domain] = email.split("@");
  return user[0] + "***@" + domain;
};

export async function sendOtpEmail(to, otp) {
  try {
    await transporter.sendMail({
      from: `"JanSeva Platform" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Verification Code",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: Arial,sans-serif;padding:20px;background:#f9f9f9;">
          <h2 style="color:#2E86C1;">Welcome to JanSeva 👋</h2>
          <p>Please use the following OTP to verify your account:</p>
          <h1 style="color:#2E86C1;">${otp}</h1>
          <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        </div>
      `,
    });

    console.log(`📧 OTP sent to ${maskEmail(to)}`);
  } catch (err) {
    console.error("❌ Failed to send OTP:", err);
    throw new Error("Could not send verification email. Please try again.");
  }
}
