const CopyrightsRights = require("../../../Models/copyrightsrights");

const getCopyrightsRights = async (req, res) => {
  try {
    const copyrightsRights = await CopyrightsRights.find();
    res.status(200).json(copyrightsRights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCopyrightsRights;