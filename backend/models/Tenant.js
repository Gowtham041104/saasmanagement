const mongoose = require("mongoose");

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
      type: String, // ✅ Add this
    },
    adminEmail: {
      type: String, // ✅ Add this
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active", // ✅ Add this
    },
    subscriptionPlan: {
      type: String,
      enum: ["free", "professional", "enterprise", "starter"],
      default: "free", // ✅ Add this
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    plan: {
      type: String,
      enum: ["Free", "Basic", "Premium", "Professional",'starter'], // added "Professional"
      default: "Free",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
