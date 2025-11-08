const liveSchema = require("../../../../Models/SocialMedia/liveSchema");

// const GetLive = async (req, res) => {
//     try {
//     const { userId } = req.params; 
//     console.log("Requested userId:", userId);
//     const liveData = await liveSchema
//       .findOne({ userId: userId })
//       .populate("userId")
//       // Populate nested chat message users for username/profilePhoto
//       .populate({ path: "live.chatMessages.user", select: "username profilePhoto" })
//       .exec();
//     console.log("Found liveData:", liveData);
//     if (!liveData) {
//       return res.status(404).json({ message: "Live session not found" });
//     }

//     res.status(200).json({
//       message: "Live session fetched successfully",
//       liveData
//     });
//   } catch (error) {
//     console.error("Error fetching live:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }

// };

const GetLive = async (req, res) => {
  try {
    const { streamKey } = req.params; 
    console.log("Requested streamKey:", streamKey);
    const liveData = await liveSchema
      .findOne({ "live.streamKey": streamKey }) 
      .populate("userId") 
      .populate({ path: "live.chatMessages.user", select: "username profilePhoto" })
      .exec();
    console.log("Found liveData:", liveData);
    if (!liveData) {
      return res.status(404).json({ message: "Live session not found" });
    }

    res.status(200).json({
      success: true, // Add success flag for consistency
      message: "Live session fetched successfully",
      liveData
    });
  } catch (error) {
    console.error("Error fetching live:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = GetLive;