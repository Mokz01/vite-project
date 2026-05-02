const today = new Date().toISOString().split("T")[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
const twoDaysAgo = new Date(Date.now() - 2 * 86400000)
  .toISOString()
  .split("T")[0];

export const seedLocalLogs = [
  {
    id: "l1",
    title: "Local gas price in Manila expected to rise",
    source: "Personal observation",
    date: today,
    status: "Verified",
    type: "Local",
    urgency: "High",
    region: "Metro Manila",
    description:
      "Local gas price in Manila expected to rise due to global crude disruptions. Pump prices may increase by ₱4–₱6/L by end of June. Monitoring Caltex and Shell weekly.",
  },
  {
    id: "l2",
    title: "Fertilizer cost up — Lucena market",
    source: "Field report",
    date: yesterday,
    status: "Verified",
    type: "Local",
    urgency: "High",
    region: "Quezon Province",
    description:
      "Urea prices up 22% vs last season. Small farmers in Quezon unable to secure inputs at cooperative rates.",
  },
  {
    id: "l3",
    title: "Rice supply at Divisoria thinning out",
    source: "Trader interview",
    date: twoDaysAgo,
    status: "Pending",
    type: "Local",
    urgency: "Medium",
    region: "Metro Manila",
    description:
      "Traders report 15–20% lower stock vs prior month. No price spike yet but monitor weekly.",
  },
  {
    id: "l4",
    title: "LPG pricing steady — Cavite household survey",
    source: "Community survey",
    date: twoDaysAgo,
    status: "Verified",
    type: "Local",
    urgency: "Low",
    region: "Cavite",
    description:
      "No significant changes yet. Flagged for monitoring given upstream oil disruption signal.",
  },
];
// Add this below your seedLocalLogs array
export const globalSignals = [
  {
    id: "g1",
    title: "Global Wheat Supply Alert",
    description:
      "Major exporters reporting lower yields. Expect flour price increases.",
    date: today,
    status: "Monitoring",
    region: "Global",
    urgency: "Medium",
  },
  {
    id: "g2",
    title: "Maritime Route Disruption",
    description:
      "Shipping lanes in the Red Sea seeing 20% less traffic due to security concerns.",
    date: yesterday,
    status: "Verified",
    region: "International",
    urgency: "High",
  },
];
