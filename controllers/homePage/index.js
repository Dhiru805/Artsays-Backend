
const createHomePage = require("./homePage/create");
const updateHomePage = require("./homePage/update");
const deleteHomePage = require("./homePage/delete");
const getPages = require("./homePage/getPages");
const getPublishedPage = require("./homePage/getPublishedPage");

const createHeroSection = require("./homePage/sections/createheroSection");
const getHeroSection = require("./homePage/sections/getheroSection");
const getTagsBrowseCategories = require("./homePage/sections/getTagsBrowseCategory");
const createBrowseCategories = require("./homePage/sections/createbrowseCategories");
const getBrowseCategories = require("./homePage/sections/getbrowseCategories");

const createWhyBuyArtsays = require("./homePage/sections/createwhyBuyArtsays");
const getWhyBuyArtsays = require("./homePage/sections/getwhyBuyArtsays");

const createBiddingArena = require("./homePage/sections/createbiddingArena");
const getBiddingArena = require("./homePage/sections/getbiddingArena");

const createHowToBuy = require("./homePage/sections/createhowToBuy");
const getHowToBuy = require("./homePage/sections/gethowToBuy");

const createDiscoverArtist = require("./homePage/sections/creatediscoverArtist");
const getDiscoverArtist = require("./homePage/sections/getdiscoverArtist");

const createWhyArtsaysDifferent = require("./homePage/sections/createwhyArtsaysDifferent");
const getWhyArtsaysDifferent = require("./homePage/sections/getwhyArtsaysDifferent");

const createChallenges = require("./homePage/sections/createchallenges");
const getChallenges = require("./homePage/sections/getchallenges");

const createArtIcon = require("./homePage/sections/createartIcon");
const getArtIcon = require("./homePage/sections/getartIcon");

const createHowToSell = require("./homePage/sections/createhowToSell");
const getHowToSell = require("./homePage/sections/gethowToSell");

const createSEO  = require("./seo/create");
const updateSEO  = require("./seo/update");
const getSEO  = require("./seo/get");

module.exports = {

  createHomePage,
  updateHomePage,
  deleteHomePage,
  getPages,
  getPublishedPage,

  createHeroSection,
  createBrowseCategories,
  createWhyBuyArtsays,
  createBiddingArena,
  createHowToBuy,
  createDiscoverArtist,
  createWhyArtsaysDifferent,
  createChallenges,
  createArtIcon,
  createHowToSell,

  getHeroSection,
  getTagsBrowseCategories,
  getBrowseCategories,
  getWhyBuyArtsays,
  getBiddingArena,
  getHowToBuy,
  getDiscoverArtist,
  getWhyArtsaysDifferent,
  getChallenges,
  getArtIcon,
  getHowToSell,


  updateSEO,
  getSEO,
  createSEO,
  
};
