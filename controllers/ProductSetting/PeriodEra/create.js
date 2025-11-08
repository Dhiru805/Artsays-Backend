const PeriodEra = require("../../../Models/periodera");

const createPeriodEra = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Period/Era is required" });
    }

    const newPeriodEra = new PeriodEra({ name });
    await newPeriodEra.save();
    res.status(201).json({ message: "Period/Era added successfully", newPeriodEra });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Period/Era name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createPeriodEra;