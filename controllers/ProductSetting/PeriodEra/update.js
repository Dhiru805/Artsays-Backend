const PeriodEra = require("../../../Models/periodera");

const updatePeriodEra = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Period/Era name is required" });
    }

    const updatedPeriodEra = await PeriodEra.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedPeriodEra) {
      return res.status(404).json({ error: "Period/Era not found" });
    }

    res.status(200).json({ message: "Period/Era updated successfully", updatedPeriodEra });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Period/Era name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updatePeriodEra;