const Report = require("../../../../Models/SocialMedia/ReportSchema");
const User = require("../../../../Models/usermode");
const Post = require("../../../../Models/SocialMedia/postSchema");
const axios = require("axios");

// 🧾 Get all reports (with filters)
exports.getAllReports = async (req, res) => {
  try {
    const { status, type } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.reportType = type;

    // Fetch all reports
    let reports = await Report.find(filter)
      .populate("reporter", "username email profilePhoto")
      .populate(
        "reportedUser",
        "username email isSuspended profilePhoto suspension"
      )
      .populate("post", "caption images createdAt")
      .sort({ createdAt: -1 })
      .lean();

    // ⚙️ Keep permanent suspended users visible, hide temporarily suspended ones
    reports = reports.filter(
      (r) =>
        !r.reportedUser?.isSuspended ||
        r.reportedUser?.suspension?.permanent === true
    );

    res.status(200).json({
      success: true,
      message: "Reports fetched successfully",
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reports",
      error: error.message,
    });
  }
};

// 🚫 Suspend user (temporary or permanent)
exports.suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days, permanent } = req.body;

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // 🟥 Permanent Suspension
    if (permanent) {
      user.isSuspended = true;
      user.suspension = {
        permanent: true,
        suspendedAt: new Date(),
        resumeAt: null,
      };
      user.suspensionEndDate = null;

      await user.save();

      return res.status(200).json({
        success: true,
        message: `User ${user.username} permanently suspended.`,
      });
    }

    // 🟨 Temporary Suspension
    if (!days || isNaN(days))
      return res.status(400).json({
        success: false,
        message: "Please provide valid suspension days",
      });

    const now = new Date();
    const resumeAt = new Date(now);
    resumeAt.setDate(now.getDate() + Number(days));

    user.isSuspended = true;
    user.suspension = {
      permanent: false,
      suspendedAt: now,
      resumeAt,
    };
    user.suspensionEndDate = resumeAt;

    await Promise.all([
      user.save(),
      Report.deleteMany({ reportedUser: userId }), // remove reports for temp suspensions
    ]);

    res.status(200).json({
      success: true,
      message: `User ${user.username} suspended for ${days} day(s) and reports cleared.`,
    });
  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while suspending user",
      error: error.message,
    });
  }
};

// 🔄 Unsuspend user (for permanent suspensions)
exports.unsuspendUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user || !user.isSuspended)
      return res
        .status(404)
        .json({ success: false, message: "User not suspended" });

    // Reset suspension info
    user.isSuspended = false;
    user.suspension = {
      permanent: false,
      suspendedAt: null,
      resumeAt: null,
    };
    user.suspensionEndDate = null;

    await user.save();

    // 🧹 Delete all reports made against this user after unsuspension
    await Report.deleteMany({ reportedUser: userId });

    res.status(200).json({
      success: true,
      message: `User ${user.username} unsuspended successfully and reports cleared.`,
    });
  } catch (error) {
    console.error("Error unsuspending user:", error);
    res.status(500).json({
      success: false,
      message: "Server error while unsuspending user",
      error: error.message,
    });
  }
};

// 🧩 Mark report as reviewed or action taken
exports.updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    if (!["pending", "reviewed", "action-taken"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    );

    if (!report)
      return res
        .status(404)
        .json({ success: false, message: "Report not found" });

    res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      report,
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating report status",
      error: error.message,
    });
  }
};

// ✅ Auto unsuspend users whose suspension expired (cron-safe function)
exports.autoUnsuspendUsers = async () => {
  try {
    const now = new Date();
    const expiredUsers = await User.find({
      isSuspended: true,
      suspensionEndDate: { $lte: now },
    });

    for (const user of expiredUsers) {
      user.isSuspended = false;
      user.suspensionEndDate = null;
      user.suspension = {
        permanent: false,
        suspendedAt: null,
        resumeAt: null,
      };
      await user.save();

      // 🧹 Remove reports for users automatically unsuspended
      await Report.deleteMany({ reportedUser: user._id });
    }

    console.log(`✅ Auto-unsuspended ${expiredUsers.length} user(s).`);
  } catch (error) {
    console.error("Error auto-unsuspending users:", error);
  }
};
