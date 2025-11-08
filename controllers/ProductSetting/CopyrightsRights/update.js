const CopyrightsRights = require("../../../Models/copyrightsrights");

const updateCopyrightsRights = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: "Copyrights Rights name is required" });
    }

    const updatedCopyrightsRights = await CopyrightsRights.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedCopyrightsRights) {
      return res.status(404).json({ error: "Copyrights Rights not found" });
    }

    res.status(200).json({ message: "Copyrights Rights updated successfully", updatedCopyrightsRights });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Copyrights Rights name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateCopyrightsRights;