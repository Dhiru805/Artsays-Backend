const CopyrightsRights = require("../../../Models/copyrightsrights");

const deleteCopyrightsRights = async (req, res) => {
  try {
    const { id } = req.params;

    const copyrightsRights = await CopyrightsRights.findById(id);
    if (!copyrightsRights) {
      return res.status(404).json({ error: "Copyrights Rights not found" });
    }

    await CopyrightsRights.findByIdAndDelete(id);

    res.status(200).json({ message: "Copyrights Rights deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCopyrightsRights;