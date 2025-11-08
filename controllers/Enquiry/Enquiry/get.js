
const Enquiry = require("../../../Models/enquiry");

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().populate("category", "mainCategoryName").sort({ createdAt: -1 });

    const formattedEnquiries = enquiries.map((e) => ({
      ...e._doc,
      categoryName: e.category ? e.category.mainCategoryName : "",
    }));

    res.status(200).json({ success: true, data: formattedEnquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = getAllEnquiries;
