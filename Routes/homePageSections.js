const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/Multerfile/homePageMulter");


const {
  createHeroSection,
  getHeroSection,
  getTagsBrowseCategories,
  createBrowseCategories,
  getBrowseCategories,
  createWhyBuyArtsays,
  getWhyBuyArtsays,
  createBiddingArena,
  getBiddingArena,
  createHowToBuy,
  getHowToBuy,
  createDiscoverArtist,
  getDiscoverArtist,
  createWhyArtsaysDifferent,
  getWhyArtsaysDifferent,
  createChallenges,
  getChallenges,
  createArtIcon,
  getArtIcon,
  createHowToSell,
  getHowToSell,
} = require("../controllers/homePage");


router.post("/hero/create", upload, createHeroSection);
router.get("/hero/:homepageId", getHeroSection);
router.get("/hero-browse-categories/getTags/:homepageId" , getTagsBrowseCategories);

router.post("/browse-categories/create", upload, createBrowseCategories);
router.get("/browse-categories/:homepageId", getBrowseCategories);


router.post("/why-buy-artsays/create", upload, createWhyBuyArtsays);
router.get("/why-buy-artsays/:homepageId", getWhyBuyArtsays);


router.post("/bidding-arena/create", upload, createBiddingArena);
router.get("/bidding-arena/:homepageId", getBiddingArena);


router.post("/how-to-buy/create", upload, createHowToBuy);
router.get("/how-to-buy/:homepageId", getHowToBuy);


router.post("/discover-artist/create", upload, createDiscoverArtist);
router.get("/discover-artist/:homepageId", getDiscoverArtist);


router.post("/why-artsays-different/create", upload, createWhyArtsaysDifferent);
router.get("/why-artsays-different/:homepageId", getWhyArtsaysDifferent);


router.post("/challenges/create", upload, createChallenges);
router.get("/challenges/:homepageId", getChallenges);


router.post("/art-icon/create", upload, createArtIcon);
router.get("/art-icon/:homepageId", getArtIcon);


router.post("/how-to-sell/create", upload, createHowToSell);
router.get("/how-to-sell/:homepageId", getHowToSell);

module.exports = router;
