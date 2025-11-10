const userRoute = require("../Routes/User.js");
const refreshTokenRoute = require("../Routes/refreshtokens");
const addressRoute = require("../Routes/useradress");
const transactionRoute = require("../Routes/transactionRoutes");
const orderRoute = require("../Routes/orderRoutes");
const shippingRoute = require("../Routes/shippingRoutes");
const socialBlogRoute = require("../Routes/socialBlogRoutes");
const requestedArtsRoutes = require("../Routes/requestedArtsRoutes");
const artistRoutes = require("../Routes/artistRoutes.js");
const buyerRoutes = require("../Routes/buyerRoutes");
const cartRoutes = require("../Routes/cartRoutes.js");
const wishlistRoutes = require("../Routes/wishlist.js");
const blogPostRoutes = require("../Routes/BlogpostRoutes.js");
const conversationRoutes = require("../Routes/conversationRoutes.js");
const messageRoutes = require("../Routes/messageRoutes.js");
const getuserRoutes = require("../Routes/getandupdateuserRoutes.js");
const BuyerCustomRequestRoutes = require("../Routes/BuyerCustomRequestRoutes.js");
const CropImageRoutes = require("../Routes/CropImageRoutes.js");
const SellerRoutes = require("../Routes/sellerRoutes.js");
const ArtistproductRoutes = require("../Routes/artistproductRoutes.js");
const BuyerproductRoutes = require("../Routes/buyerproductroutes.js");
const ResellproductRoutes = require("../Routes/resellproductRoutes.js");
const TransactionRoutes = require("../Routes/transaction.js");
const PackagingMaterialRoutes = require("../Routes/packagingmaterialRoutes.js");
const Biddingroutes = require("../Routes/biddingRoutes.js");
const Categoryroutes = require("../Routes/categoryRoutes.js");
const Adminroutes = require("../Routes/adminRoutes.js");
const ForgotPasswordRoutes = require("../Routes/forgotpasswordRoutes.js");
const EmailRoutes = require("../Routes/EmailSettingRoutes.js");
const TemplatesRoutes = require("../Routes/EmailTemplatesRoutes.js");
const MarketingEmailRoutes = require("../Routes/MarketingEmailRoutes");
const Certifiaction = require("../Routes/certification.js");
const Faq = require("../Routes/faq.js");
const CarrerRoutes = require("../Routes/carrer.js");
const careerApplicationsRoutes = require("../Routes/careerApplications.js");
const ExhibitionRoutes = require("../Routes/exhibition.js");
const TargetingRoutes = require("./targeting.js");
const sidebarTabsRoutes = require("../Routes/sidebarTabsRoutes.js");
const ReviewRoutes = require("../Routes/ProductRating.js");
const CampaignRoutes = require("../Routes/campaignRoutes.js");
const policyRoutes = require("../Routes/policyRoutes");
const policy = require("../Routes/policy.js");
const howToBuyRoutes = require("../Routes/howToBuy");
const howToSellRoutes = require("../Routes/HowToSell");
const howToResellRoutes = require("../Routes/howToResell");
const whyArtSaysRoutes = require("../Routes/WhyArtSays");
const licensingRoutes = require("../Routes/licensing");
const commissionRoutes = require("../Routes/commission");
const howToBidRoutes = require("../Routes/howToBid.js");
const affiliateBPRouter = require("../Routes/affiliatebp");
const affiliateRouter = require("../Routes/affiliate");
const enquiryRouter = require("../Routes/enquiryRoutes");
const contactUsRouter = require("../Routes/contactUsRoutes");
const aboutUsRouter = require("../Routes/aboutUs");
const aboutUsSectionsRouter = require("../Routes/aboutUsSections");
const createChallenge = require("../Routes/challengeRoutes.js");
const challengeApplications = require("../Routes/challengeApplications.js");
const celebraties = require("../Routes/celebraties.js");
const homePageRouter = require("../Routes/homePage");
const homePageSectionsRouter = require("../Routes/homePageSections.js");
const artsaysGalleryRouter = require("../Routes/artsaysGallery");
const CMSartsaysGalleryRouter = require("../Routes/CMSartsaysGallery.js");
const profileRoutes = require("../Routes/SocialMedia/profileRoutes.js");
const postRoutes = require("../Routes/SocialMedia/postRoutes.js");
const settingRoutes = require("../Routes/SocialMedia/settingRoutes.js");
const CommunityCMS = require("../Routes/communityCMS.js");
const liveRoutes = require("../Routes/SocialMedia/liveRoutes.js");
const materialName = require("../Routes/PackagingMaterialSetting/materialName.js");
const materialSize = require("../Routes/PackagingMaterialSetting/materialSize.js");
const materialStamp = require("../Routes/PackagingMaterialSetting/stamp.js");
const materialStickers = require("../Routes/PackagingMaterialSetting/stickers.js");
const materialCapacity = require("../Routes/PackagingMaterialSetting/capacity.js");
const materialCard = require("../Routes/PackagingMaterialSetting/card.js");
const materialVouchers = require("../Routes/PackagingMaterialSetting/vouchers.js");
const packageMaterial = require("../Routes/packagingMaterial.js");
const packageMaterialArtist = require("../Routes/packageMaterialArtist.js");
const packageMaterialSeller = require("../Routes/packageMaterialSeller.js");
const ProductSettingRoutes = require("../Routes/productSettingRoutes.js");
const Wallet = require("../Routes/wallet.js");
const BiddingPassRoutes = require("../Routes/biddingPassRoutes.js");
const certificateRoutes = require("../Routes/certificateCMS.js");
const partnerRoutes = require("../Routes/partner.js");
const insuranceRoutes = require("../Routes/insurance.js");
const GST = require("../Routes/gstRoutes.js");
const InsuranceSettingRoutes = require("../Routes/insurancesetting.js")

module.exports = (app) => {
  // Auth & User
  app.use("/auth", userRoute);
  app.use("/auth", getuserRoutes);
  app.use("/refresh-token", refreshTokenRoute);
  app.use("/user-address", addressRoute);

  // Core Functional Routes
  app.use("/transactions", transactionRoute);
  app.use("/orders", orderRoute);
  app.use("/shipping", shippingRoute);
  app.use("/uploads", require("express").static("uploads"));

  // Blogs & Social
  app.use("/social", socialBlogRoute);
  app.use("/Blog-Post", blogPostRoutes);
  app.use("/api/conversation", conversationRoutes);
  app.use("/api/message", messageRoutes);
  app.use("/api", profileRoutes);
  app.use("/api", postRoutes);
  app.use("/api", settingRoutes);
  app.use("/api", CommunityCMS);
  app.use("/api", liveRoutes);

  // Buyer, Seller, Artist
  app.use("/api/requested-arts", requestedArtsRoutes);
  app.use("/artist", artistRoutes);
  app.use("/api/buyers", buyerRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/wishlist", wishlistRoutes);
  app.use("/api", BuyerCustomRequestRoutes);
  app.use("/api", CropImageRoutes);
  app.use("/api", SellerRoutes);
  app.use("/api", ArtistproductRoutes);
  app.use("/api", BuyerproductRoutes);
  app.use("/api", ResellproductRoutes);

  // Financial & Admin
  app.use("/api", TransactionRoutes);
  app.use("/api", PackagingMaterialRoutes);
  app.use("/api", Biddingroutes);
  app.use("/api", BiddingPassRoutes);
  app.use("/api", Categoryroutes);
  app.use("/api", Adminroutes);
  app.use("/api", ForgotPasswordRoutes);

  // Marketing, Email & Policies
  app.use("/api", EmailRoutes);
  app.use("/api", TemplatesRoutes);
  app.use("/api", MarketingEmailRoutes);
  app.use("/api", policy);
  app.use("/api/policies", policyRoutes);

  // Informational Routes
  app.use("/api", Faq);
  app.use("/api/howtobuy", howToBuyRoutes);
  app.use("/api/howtosell", howToSellRoutes);
  app.use("/api/how-to-resell", howToResellRoutes);
  app.use("/api/whyartsays", whyArtSaysRoutes);
  app.use("/api/licensing", licensingRoutes);
  app.use("/api/commission", commissionRoutes);
  app.use("/api/how-to-bid", howToBidRoutes);

  // Affiliate & Enquiry
  app.use("/api/affiliate", affiliateRouter);
  app.use("/api/affiliate-bp", affiliateBPRouter);
  app.use("/api/enquiry", enquiryRouter);
  app.use("/api/contactus", contactUsRouter);

  // About, Careers, Exhibitions
  app.use("/api/about-us", aboutUsRouter);
  app.use("/api/about-us-sections", aboutUsSectionsRouter);
  app.use("/api", CarrerRoutes);
  app.use("/api", careerApplicationsRoutes);
  app.use("/api", ExhibitionRoutes);

  // Homepage & Gallery
  app.use("/api/homepage", homePageRouter);
  app.use("/api/homepage-sections", homePageSectionsRouter);
  app.use("/api/artsays-gallery", artsaysGalleryRouter);
  app.use("/api/CMS-artsays-gallery", CMSartsaysGalleryRouter);

  // Challenges, Celebrities, Targeting, Reviews
  app.use("/api", createChallenge);
  app.use("/api", challengeApplications);
  app.use("/api", celebraties);
  app.use("/api", TargetingRoutes);
  app.use("/api/reviews", ReviewRoutes);
  app.use("/api", sidebarTabsRoutes);
  app.use("/api", CampaignRoutes);

  // Packaging Material Settings
  app.use("/api", materialName);
  app.use("/api", materialSize);
  app.use("/api", materialStamp);
  app.use("/api", materialCard);
  app.use("/api", materialStickers);
  app.use("/api", materialCapacity);
  app.use("/api", materialVouchers);
  app.use("/api", packageMaterial);
  app.use("/api", packageMaterialArtist);
  app.use("/api", packageMaterialSeller);

  // Product Settings
  app.use("/api", ProductSettingRoutes);

  // Certification
  app.use("/api", Certifiaction);

  // Wallet Routes
  app.use("/api/wallet", Wallet);

  // Certificate CMS Routes
  app.use("/api/certificate", certificateRoutes);

  // Partner Routes
  app.use("/api/partner", partnerRoutes);

  // Insurance Routes
  app.use("/api/insurance", insuranceRoutes);
  app.use("/api",GST);
  app.use("/api",InsuranceSettingRoutes);
};
