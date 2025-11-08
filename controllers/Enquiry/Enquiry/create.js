const Enquiry = require("../../../Models/enquiry");

const createEnquiry = async (req, res) => {
  try {
    const { name, email, contactNumber, category, message } = req.body;

    if (!name || !email || !contactNumber || !category || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const enquiry = new Enquiry({
      name,
      email,
      contactNumber,
      category,
      message,
    });

    await enquiry.save();

    res.status(201).json({ success: true, data: enquiry });
    console.log("New Enquiry Created:", enquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = createEnquiry;
