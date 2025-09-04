export const env = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUD_PROVIDER: process.env.CLOUD_PROVIDER || "local",
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads",

  // Email configs
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
  SMTP_PORT: process.env.SMTP_PORT || 465,
};
