const mongoose = require("mongoose");

const PLAN_VALUES = ["Free", "Basic", "Premium", "Professional", "Enterprise", "Starter"];
const normalizePlan = (value = "") => {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "Free";
  const normalized = trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
  return PLAN_VALUES.includes(normalized) ? normalized : "Free";
};

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    domain: {
      type: String,
    },
    adminEmail: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
    subscriptionPlan: {
      type: String,
      enum: ["free", "professional", "enterprise", "starter"],
      default: "free",
      set: (value) => String(value || "").trim().toLowerCase() || "free",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    plan: {
      type: String,
      default: "Free",
      set: normalizePlan,
    },
    subscribedProducts: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
