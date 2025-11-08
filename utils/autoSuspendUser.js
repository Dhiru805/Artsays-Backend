// server.js or cron.js
const cron = require("node-cron");
const { autoUnsuspendUsers } = require("../controllers/SocialMedia/SocialMediaProfile/Report/ReportModeration");

// Run every hour (or once daily)
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Running auto-unsuspend task...");
  await autoUnsuspendUsers();
});
