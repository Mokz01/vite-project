export const theme = {
  colors: {
    navy: "#1B263B",
    navyLight: "#263449",
    teal: "#415A77",
    tealLight: "#4e6d8f",
    offWhite: "#E0E1DD",
    white: "#FFFFFF",
    alert: "#E63946",
    gold: "#E9A800",
    jade: "#2A9D5C",
  },
  urgency: {
    High: {
      bg: "bg-alert/10",
      text: "text-alert",
      border: "border-alert/30",
      dot: "bg-alert",
    },
    Medium: {
      bg: "bg-gold/10",
      text: "text-gold-dark",
      border: "border-gold/30",
      dot: "bg-gold",
    },
    Low: {
      bg: "bg-jade/10",
      text: "text-jade",
      border: "border-jade/30",
      dot: "bg-jade",
    },
  },
  status: {
    Verified: { bg: "bg-jade/10", text: "text-jade", icon: "✓" },
    Pending: { bg: "bg-gold/10", text: "text-gold-dark", icon: "◌" },
    Flagged: { bg: "bg-alert/10", text: "text-alert", icon: "!" },
  },
};

export const STORAGE_KEY = "pss_signal_logs";
