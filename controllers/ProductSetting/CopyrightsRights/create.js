const CopyrightsRights = require("../../../Models/copyrightsrights");

const createCopyrightsRights = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Copyrights Rights is required" });
    }

    const newCopyrightsRights = new CopyrightsRights({ name });
    await newCopyrightsRights.save();
    res.status(201).json({ message: "Copyrights Rights added successfully", newCopyrightsRights });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Copyrights Rights name must be unique" });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = createCopyrightsRights;