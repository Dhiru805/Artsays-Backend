
const express = require("express");
const {
createGSTsetting,
updateGSTsetting,
getGSTsetting,
deleteGSTsetting
} = require("../controllers/GST/index");
const router = express.Router();


router.post("/create-gst-setting", createGSTsetting);
router.put("/update-gst-setting/:id", updateGSTsetting);
router.delete("/delete-gst-setting/:id",deleteGSTsetting);
router.get("/get-gst-setting", getGSTsetting);




module.exports = router;