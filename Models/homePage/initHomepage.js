
// const Homepage = require("../homePage/Homepage");
// const HeroSection = require("../homePage/sections/hero");
// const BrowseCategories = require("../homePage/sections/browseCategories");
// const WhyBuyArtsays = require("../homePage/sections/whyBuyFromArtsays");
// const BiddingArena = require("../homePage/sections/biddingArena");
// const HowToBuyHP = require("../homePage/sections/howToBuy");
// const DiscoverArtist = require("../homePage/sections/discoverArtist");
// const WhyArtsaysDifferent = require("../homePage/sections/whyArtsaysDifferent");
// const Challenges = require("../homePage/sections/challenges");
// const ArtIcon = require("../homePage/sections/artIcon");
// const HowToSellHP = require("../homePage/sections/howToSell");

// async function initHomepage() {
//   let homepage = await Homepage.findOne();

//   if (!homepage) {
//     homepage = await Homepage.create({
//       title: "Artsays Home",
//       status: "draft",
//     });
//     console.log("Created main Homepage document");
//   }

//   const homepageId = homepage._id;

//   await HeroSection.ensureDefault(homepageId);
//   await BrowseCategories.ensureDefault(homepageId);
//   await WhyBuyArtsays.ensureDefault(homepageId);
//   await BiddingArena.ensureDefault(homepageId);
//   await HowToBuyHP.ensureDefault(homepageId);
//   await DiscoverArtist.ensureDefault(homepageId);
//   await WhyArtsaysDifferent.ensureDefault(homepageId);
//   await Challenges.ensureDefault(homepageId);
//   await ArtIcon.ensureDefault(homepageId);
//   await HowToSellHP.ensureDefault(homepageId);

//   console.log("All homepage sections initialized with defaults");
// }

// module.exports = initHomepage;



const Homepage = require("../homePage/Homepage");
const HeroSection = require("../homePage/sections/hero");
const BrowseCategories = require("../homePage/sections/browseCategories");
const WhyBuyArtsays = require("../homePage/sections/whyBuyFromArtsays");
const BiddingArena = require("../homePage/sections/biddingArena");
const HowToBuyHP = require("../homePage/sections/howToBuy");
const DiscoverArtist = require("../homePage/sections/discoverArtist");
const WhyArtsaysDifferent = require("../homePage/sections/whyArtsaysDifferent");
const Challenges = require("../homePage/sections/challenges");
const ArtIcon = require("../homePage/sections/artIcon");
const HowToSellHP = require("../homePage/sections/howToSell");

async function initHomepage() {
  let homepage = await Homepage.findOne().sort({ createdAt: -1 });

  if (!homepage) {
    homepage = await Homepage.create({
      title: "Artsays Home",
      status: "draft",
    });
    console.log("Created main Homepage document");
  }

  const homepageId = homepage._id;

  const heroDoc = await HeroSection.findOne({ homepageId }) || await HeroSection.create({ homepageId });
  const browseDoc = await BrowseCategories.findOne({ homepageId }) || await BrowseCategories.create({ homepageId });
  const whyBuyDoc = await WhyBuyArtsays.findOne({ homepageId }) || await WhyBuyArtsays.create({ homepageId });
  const biddingDoc = await BiddingArena.findOne({ homepageId }) || await BiddingArena.create({ homepageId });
  const howToBuyDoc = await HowToBuyHP.findOne({ homepageId }) || await HowToBuyHP.create({ homepageId });
  const discoverDoc = await DiscoverArtist.findOne({ homepageId }) || await DiscoverArtist.create({ homepageId });
  const whyDiffDoc = await WhyArtsaysDifferent.findOne({ homepageId }) || await WhyArtsaysDifferent.create({ homepageId });
  const challengesDoc = await Challenges.findOne({ homepageId }) || await Challenges.create({ homepageId });
  const artIconDoc = await ArtIcon.findOne({ homepageId }) || await ArtIcon.create({ homepageId });
  const howToSellDoc = await HowToSellHP.findOne({ homepageId }) || await HowToSellHP.create({ homepageId });

  const needsUpdate = !homepage.heroSection || !homepage.browseCategories || !homepage.whyBuyArtsays || !homepage.biddingArena || !homepage.howToBuyHP || !homepage.discoverArtist || !homepage.whyArtsaysDifferent || !homepage.challenges || !homepage.artIcon || !homepage.howToSellHP;

  if (needsUpdate) {
    homepage = await Homepage.findByIdAndUpdate(
      homepageId,
      {
        heroSection: heroDoc._id,
        browseCategories: browseDoc._id,
        whyBuyArtsays: whyBuyDoc._id,
        biddingArena: biddingDoc._id,
        howToBuyHP: howToBuyDoc._id,
        discoverArtist: discoverDoc._id,
        whyArtsaysDifferent: whyDiffDoc._id,
        challenges: challengesDoc._id,
        artIcon: artIconDoc._id,
        howToSellHP: howToSellDoc._id,
      },
      { new: true }
    );

    console.log("All homepage sections initialized and linked to main document");
  } else {
    console.log("Homepage sections already linked, skipping update");
  }
}

module.exports = initHomepage;
