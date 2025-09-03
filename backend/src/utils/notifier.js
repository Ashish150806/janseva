import Notification from "../../models/Notification.js";

export async function notify(userId, type, payload = {}) {
  await Notification.create({ user: userId, type, payload });
  // Extend: send email/SMS/push here
}
