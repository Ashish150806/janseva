import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "../../..");

export async function uploadBufferToStorage(buffer, originalname) {
  // Local dev storage
  if ((process.env.CLOUD_PROVIDER || "local") === "local") {
    const dir = path.join(root, process.env.UPLOAD_DIR || "./uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filename = `${Date.now()}-${originalname.replace(/\s+/g, "_")}`;
    const filepath = path.join(dir, filename);
    await fs.promises.writeFile(filepath, buffer);
    return { url: `/uploads/${filename}`, provider: "local" };
  }

  // TODO: Add Cloudinary/S3 here as needed
  throw new Error("Non-local cloud provider not configured");
}
