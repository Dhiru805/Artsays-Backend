const express = require("express");


const {
createExhibition,
updateExhibition,
getExhibitionsByUserType,
deleteExhibitionById,
getExhibitionbyuserId,
getonlyartistseller,
updateExhibitionStatus


} = require("../controllers/Exhibition/index");
const router = express.Router();



router.post("/create-exhibition",  createExhibition);
router.put("/update-exhibition/:id",  updateExhibition);
router.get("/get-exhibition/:userType",  getExhibitionsByUserType);
router.delete("/delete-exhibition/:id", deleteExhibitionById);
router.get("/get-exhibition-userId/:userId",  getExhibitionbyuserId);
router.get("/get-exhibition-artistseller",  getonlyartistseller);
router.put("/update-exhibition-status/:id",  updateExhibitionStatus);

module.exports = router;