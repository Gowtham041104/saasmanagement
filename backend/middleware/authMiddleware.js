// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const protect = async (req, res, next) => {
  try {
    // normalize header access and log for debugging
    const authHeader =
      req.headers["authorization"] || req.headers["Authorization"];
    console.log("protect - incoming Authorization header:", authHeader);

    if (!authHeader) {
      return res
        .status(401)
        .json({ code: "NO_AUTH_HEADER", message: "Not authorized, no token" });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          code: "AUTH_MALFORMED",
          message: "Authorization header malformed",
        });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ code: "NO_TOKEN", message: "Not authorized, token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("protect - jwt.verify error:", err.name, err.message);
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({
            code: "TOKEN_EXPIRED",
            message: "Access token expired",
            expiredAt: err.expiredAt,
          });
      }
      return res
        .status(401)
        .json({ code: "TOKEN_INVALID", message: "Token invalid" });
    }

    // attach user to request (exclude password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ code: "USER_NOT_FOUND", message: "User not found for token" });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error("protect - unexpected error:", err);
    return res
      .status(500)
      .json({ code: "AUTH_ERROR", message: "Authentication failed" });
  }
};

module.exports = { protect };
