const PeriodEra = require("../../../Models/periodera");

const getPeriodEras = async (req, res) => {
  try {
    const periodEras = await PeriodEra.find();
    res.status(200).json(periodEras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPeriodEras;