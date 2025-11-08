//get api

const mongoose = require("mongoose");
const Career = require("../../../Models/Career");

const getCareer = async (req, res) => {
  try {
    const careers = await Career.find();
    return res.status(200).json({
      hasError: false,
      message: "Careers fetched successfully.",
      data: careers,
    });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch careers.",
      error: error.message,
    });
  }
};

const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await Career.findById(id);
    return res.status(200).json({
      hasError: false,
      message: "Fetched successfully",
      data: career
    })
  }
  catch (error) {
    console.log('Error at fetching careers by id: ', error)
    return res.status(500).json({
      hasError: true,
      message: "Failed to fetch",
      error: error.message
    })
  }
}

module.exports = { getCareer, getCareerById };
