export const env = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUD_PROVIDER: process.env.CLOUD_PROVIDER || "local",
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads"
};
