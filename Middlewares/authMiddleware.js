const jwt = require("jsonwebtoken");
const User = require("../Models/usermode");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ message: "Unauthorized: No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Unauthorized: Invalid token format" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userId;
    req.user = decoded;

    // 🧩 Fetch user from DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🚫 Check suspension status
    if (user.isSuspended) {
      // Permanent suspension
      if (user.suspension?.permanent) {
        return res.status(403).json({
          message:
            "Your account has been permanently suspended. Please contact support.",
          suspended: true,
          permanent: true,
        });
      }

      // Temporary suspension
      if (user.suspensionEndDate && user.suspensionEndDate > new Date()) {
        return res.status(403).json({
          message:
            "Your account is temporarily suspended. Please wait until your suspension period ends.",
          suspended: true,
          permanent: false,
          resumeAt: user.suspensionEndDate,
        });
      }
    }

    next();
  } catch (err) {
    console.error("JWT Authentication Error:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;
