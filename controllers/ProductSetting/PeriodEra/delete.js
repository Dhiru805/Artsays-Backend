const PeriodEra = require("../../../Models/periodera");

const deletePeriodEra = async (req, res) => {
  try {
    const { id } = req.params;

    const periodEra = await PeriodEra.findById(id);
    if (!periodEra) {
      return res.status(404).json({ error: "Period/Era not found" });
    }

    await PeriodEra.findByIdAndDelete(id);

    res.status(200).json({ message: "Period/Era deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deletePeriodEra;