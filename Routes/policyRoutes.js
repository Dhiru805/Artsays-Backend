
const express = require("express");
const router = express.Router();
const Policy = require("../Models/Policy");


router.post("/", async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    const policy = new Policy({ title, content, slug });
    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create policy", error: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const update = (({ title, content, slug }) => ({ title, content, slug }))(req.body);
    const policy = await Policy.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: "Failed to update policy" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Policy.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete policy" });
  }
});


router.put("/:id/publish", async (req, res) => {
  try {
    const { single = true } = req.body; 
    if (single) {
      await Policy.updateMany({}, { isPublished: false, publishedAt: null });
    }
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      { isPublished: true, publishedAt: new Date() },
      { new: true }
    );
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: "Failed to publish policy" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 20, q } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const docs = await Policy.find(filter).sort({ createdAt: -1 })
      .skip((page - 1) * limit).limit(Number(limit));
    const total = await Policy.countDocuments(filter);
    res.json({ items: docs, total });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch policies" });
  }
});

router.get("/latest", async (req, res) => {
  try {
    const policy = await Policy.findOne({ isPublished: true }).sort({ publishedAt: -1 });
    res.json(policy || null);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch latest policy" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch policy" });
  }
});

module.exports = router;
