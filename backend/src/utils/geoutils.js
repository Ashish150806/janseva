export function toLocation(lat, lng, address = "") {
  if (typeof lat !== "number" || typeof lng !== "number") throw new Error("Invalid lat/lng");
  return { lat, lng, address };
}
