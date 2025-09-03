import multer from "multer";
import { uploadBufferToStorage } from "../config/cloudStorage.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export async function handleUpload(req, res, next) {
  try {
    if (!req.file) return next();
    const { buffer, originalname } = req.file;
    const { url } = await uploadBufferToStorage(buffer, originalname);
    req.uploadedUrl = url; // attach to request
    next();
  } catch (e) {
    next(e);
  }
}
