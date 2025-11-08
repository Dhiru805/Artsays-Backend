const mongoose = require("mongoose");
const Exhibition = require("../../../Models/Exhibition");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/Exhibition");
const fs = require("fs");
const path = require("path");

const updateExhibition = [
  upload,
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { id } = req.params;
      const {
        title,
        type,
        startDate,
        endDate,
        eventLocation,
        eventUrl,
        dailyTiming,
        entryType,
        ticketPrice,
        language,
        hostedBy,
        contactDetails,
        guestSpeaker,
        earlyBirdDiscounts,
        maxCapacity,
        liveBidding,
        certificateDistribution,
        awardDistribution,
        eventPromotion,
        userType,
        userId,
      } = req.body;

      const errors = [];
      if (!mongoose.Types.ObjectId.isValid(id)) {
        errors.push("Valid exhibition ID is required.");
      }
      if (userType && !["Artist", "Seller", "Super-Admin"].includes(userType)) {
        errors.push("Valid user type (Artist, Seller, or Super-Admin) is required.");
      }
      if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("Valid user ID is required.");
      }
      if (title && (!title.trim() || typeof title !== "string")) {
        errors.push("Valid title is required.");
      }
      if (type && !["Live Event", "Physical Gallery", "Virtual"].includes(type)) {
        errors.push("Valid exhibition type (Live Event, Physical Gallery, or Virtual) is required.");
      }
      if (startDate && isNaN(new Date(startDate).getTime())) {
        errors.push("Valid start date is required.");
      }
      if (endDate && isNaN(new Date(endDate).getTime())) {
        errors.push("Valid end date is required.");
      }
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        errors.push("Start date cannot be after end date.");
      }
      if (type && type !== "Virtual") {
        const parsedEventLocation = typeof eventLocation === "string" ? JSON.parse(eventLocation) : eventLocation;
        if (parsedEventLocation && !parsedEventLocation.address?.trim()) {
          errors.push("Event location address is required for non-virtual exhibitions.");
        }
        if (parsedEventLocation && !parsedEventLocation.city?.trim()) {
          errors.push("Event location city is required for non-virtual exhibitions.");
        }
        if (parsedEventLocation && !parsedEventLocation.country?.trim()) {
          errors.push("Event location country is required for non-virtual exhibitions.");
        }
      } else if (type === "Virtual" && eventUrl && !eventUrl.trim()) {
        errors.push("Event URL is required for virtual exhibitions.");
      }
      if (dailyTiming && !dailyTiming.trim()) {
        errors.push("Daily timing is required.");
      }
      if (entryType && !["Free", "Ticket"].includes(entryType)) {
        errors.push("Valid entry type (Free or Ticket) is required.");
      }
      if (entryType === "Ticket" && ticketPrice && !ticketPrice.trim()) {
        errors.push("Ticket price is required for ticketed events.");
      }
      if (language && !language.trim()) {
        errors.push("Language is required.");
      }
      if (hostedBy && !hostedBy.trim()) {
        errors.push("Hosted by is required.");
      }
      if (maxCapacity && (isNaN(maxCapacity) || Number(maxCapacity) < 1)) {
        errors.push("Valid maximum capacity (at least 1) is required.");
      }
      const parsedContactDetails = contactDetails
        ? typeof contactDetails === "string"
          ? JSON.parse(contactDetails)
          : contactDetails
        : null;
      if (parsedContactDetails) {
        if (!parsedContactDetails.fullName?.trim()) errors.push("Contact full name is required.");
        if (!parsedContactDetails.mobileNo?.trim()) errors.push("Contact mobile number is required.");
        if (!parsedContactDetails.email?.trim()) errors.push("Contact email is required.");
      }
      if (req.files?.coverBanner && !req.files.coverBanner[0]) {
        errors.push("Invalid cover banner file.");
      }
      if (req.files?.logo && !req.files.logo[0]) {
        errors.push("Invalid logo file.");
      }
      if (eventPromotion && !["Promotion", "Invite"].includes(eventPromotion)) {
        errors.push("Event promotion must be either 'Promotion' or 'Invite'.");
      }
      if (eventPromotion && !["Artist", "Seller"].includes(userType || exhibition.userType)) {
        errors.push("Event promotion is only allowed for Artist or Seller user types.");
      }

      if (errors.length > 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          hasError: true,
          message: errors.join(" "),
        });
      }

      const exhibition = await Exhibition.findById(id).session(session);
      if (!exhibition) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          hasError: true,
          message: "Exhibition not found.",
        });
      }

      if (req.files?.coverBanner && exhibition.coverBanner) {
        const oldCoverPath = path.join(__dirname, "../../../", exhibition.coverBanner);
        if (fs.existsSync(oldCoverPath)) {
          try {
            fs.unlinkSync(oldCoverPath);
          } catch (err) {
            console.warn(`Failed to delete old cover banner: ${oldCoverPath}`, err.message);
          }
        }
      }
      if (req.files?.logo && exhibition.logo) {
        const oldLogoPath = path.join(__dirname, "../../../", exhibition.logo);
        if (fs.existsSync(oldLogoPath)) {
          try {
            fs.unlinkSync(oldLogoPath);
          } catch (err) {
            console.warn(`Failed to delete old logo: ${oldLogoPath}`, err.message);
          }
        }
      }

      const parsedEventLocation = eventLocation
        ? typeof eventLocation === "string"
          ? JSON.parse(eventLocation)
          : eventLocation
        : exhibition.eventLocation;
      const parsedContactDetailsFinal = parsedContactDetails || exhibition.contactDetails;
      const parsedEarlyBirdDiscounts = earlyBirdDiscounts
        ? typeof earlyBirdDiscounts === "string"
          ? JSON.parse(earlyBirdDiscounts)
          : earlyBirdDiscounts
        : exhibition.earlyBirdDiscounts;

      const updates = {
        title: title ? title.trim() : exhibition.title,
        type: type || exhibition.type,
        startDate: startDate ? new Date(startDate) : exhibition.startDate,
        endDate: endDate ? new Date(endDate) : exhibition.endDate,
        eventLocation: parsedEventLocation,
        eventUrl: eventUrl ? eventUrl.trim() : exhibition.eventUrl,
        dailyTiming: dailyTiming ? dailyTiming.trim() : exhibition.dailyTiming,
        entryType: entryType || exhibition.entryType,
        ticketPrice: ticketPrice ? ticketPrice.trim() : exhibition.ticketPrice,
        language: language ? language.trim() : exhibition.language,
        coverBanner: req.files?.coverBanner
          ? getFilePath(req.files.coverBanner[0])
          : exhibition.coverBanner,
        logo: req.files?.logo ? getFilePath(req.files.logo[0]) : exhibition.logo,
        hostedBy: hostedBy ? hostedBy.trim() : exhibition.hostedBy,
        contactDetails: parsedContactDetailsFinal,
        guestSpeaker: guestSpeaker !== undefined ? guestSpeaker.trim() : exhibition.guestSpeaker,
        earlyBirdDiscounts: parsedEarlyBirdDiscounts,
        maxCapacity: maxCapacity ? parseInt(maxCapacity) : exhibition.maxCapacity,
        liveBidding:
          liveBidding !== undefined
            ? liveBidding === "true" || liveBidding === true
            : exhibition.liveBidding,
        certificateDistribution:
          certificateDistribution !== undefined
            ? certificateDistribution === "true" || certificateDistribution === true
            : exhibition.certificateDistribution,
        awardDistribution:
          awardDistribution !== undefined
            ? awardDistribution === "true" || awardDistribution === true
            : exhibition.awardDistribution,
        eventPromotion: eventPromotion || exhibition.eventPromotion,
        userType: userType || exhibition.userType,
        userId: userId || exhibition.userId,
      };

      Object.assign(exhibition, updates);
      await exhibition.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        hasError: false,
        message: "Exhibition updated successfully.",
        data: exhibition,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error updating exhibition:", error);
      return res.status(500).json({
        hasError: true,
        message: "Failed to update exhibition.",
        error: error.message,
      });
    }
  },
];

module.exports = updateExhibition;