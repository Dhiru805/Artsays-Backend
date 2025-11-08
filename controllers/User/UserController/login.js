const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../Models/usermode");

const loginUser = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({
        message: "Email/Phone and password are required",
      });
    }

    //  Format phone if 10-digit number
    let formattedPhone = emailOrPhone;
    if (/^\d{10}$/.test(emailOrPhone)) {
      formattedPhone = `+91${emailOrPhone}`;
    }

    //  Find user by email or phone
    let user = await User.findOne({ email: emailOrPhone });
    if (!user) {
      user = await User.findOne({
        $or: [{ phone: emailOrPhone }, { phone: formattedPhone }],
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please check your email or phone number.",
      });
    }

    if (!user.password) {
      return res.status(500).json({
        message: "User password is missing. Contact support.",
      });
    }

    // 🔒 Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Incorrect password. Please try again." });
    }

    //  Check suspension status
    if (user.isSuspended) {
      const suspension = user.suspension || {};

      //  Permanent suspension
      if (suspension.permanent) {
        return res.status(403).json({
          message:
            "Your account has been permanently suspended. Please contact support.",
          suspensionType: "permanent",
        });
      }

      //  Temporary suspension (check expiry)
      const now = new Date();
      if (user.suspensionEndDate && user.suspensionEndDate > now) {
        const resumeDate = new Date(user.suspensionEndDate).toLocaleString();
        return res.status(403).json({
          message: `Your account is temporarily suspended until ${resumeDate}.`,
          suspensionType: "temporary",
          resumeAt: resumeDate,
        });
      }

      //  If suspension expired, auto-unsuspend
      user.isSuspended = false;
      user.suspension = {
        permanent: false,
        suspendedAt: null,
        resumeAt: null,
      };
      user.suspensionEndDate = null;
      await user.save();
    }

    //  Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, role: user.role, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    //  Login Success
    res.status(200).json({
      message: "Login successful",
      token,
      userType: user.userType,
      email: user.email,
      phone: user.phone,
      userId: user._id,
      status: user.status,
      userrole: user.userrole,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = loginUser;
