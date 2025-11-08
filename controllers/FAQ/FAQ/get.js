const FAQ = require("../../../Models/FAQ");

const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();

    return res.status(200).json({
      hasError: false,
      message: "FAQs fetched successfully.",
      data: faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch FAQs.",
      error: error.message,
    });
  }
};

module.exports = getFAQs;