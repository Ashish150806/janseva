import Report from "../../models/report.js";

export async function hotspotByGrid({ size = 0.05 } = {}) {
  // simple grid binning for heatmap
  return Report.aggregate([
    {
      $project: {
        gx: { $floor: { $divide: ["$location.lat", size] } },
        gy: { $floor: { $divide: ["$location.lng", size] } }
      }
    },
    { $group: { _id: { gx: "$gx", gy: "$gy" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 100 }
  ]);
}

export async function slaStats() {
  return Report.aggregate([
    {
      $project: {
        status: 1,
        timeToAck: { $subtract: ["$updatedAt", "$createdAt"] }
      }
    },
    { $group: { _id: "$status", avgMs: { $avg: "$timeToAck" }, count: { $sum: 1 } } }
  ]);
}
