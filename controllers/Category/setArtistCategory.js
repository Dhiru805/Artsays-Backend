// controllers/artistController.js
const ArtistDetails = require('../../Models/artistdetails');
const User = require('../../Models/usermode');

const setArtistCategories = async (req, res) => {
  try {
    const { userId, artCategories } = req.body;

    if (!userId || !Array.isArray(artCategories)) {
      return res.status(400).json({
        message: "userId and artCategories[] are required",
      });
    }

    // 1️⃣ check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let artist;

    // 2️⃣ check if user already has artistDetails linked
    if (user.artistDetails) {
      artist = await ArtistDetails.findById(user.artistDetails);
      if (!artist) {
        return res.status(404).json({ message: "Artist details not found" });
      }
      // update categories
      artist.artCategories = artCategories;
      await artist.save();
    } else {
      // 3️⃣ create new ArtistDetails if not linked yet
      artist = new ArtistDetails({
        userId,
        artistName: user.name || "Unknown", // required field, fallback
        artCategories,
      });
      await artist.save();
      

      // link to user
      user.artistDetails = artist._id;
      await user.save();
    }
    console.log("Artist categories set:", artist);

    res.status(200).json({
      message: "Main categories saved successfully",
    
      data: artist,
    });
  } catch (error) {
    console.error("Error saving artCategories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = setArtistCategories;
