const mongoose = require("mongoose");
const Exhibition = require("../../../Models/Exhibition");
const { upload, getFilePath } = require("../../../Middlewares/Multerfile/Exhibition");

const createExhibition = [
  upload,
  async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
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
      if (!userType || !["Artist", "Seller", "Super-Admin"].includes(userType)) {
        errors.push("Valid user type (Artist, Seller, or Super-Admin) is required.");
      }
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        errors.push("Valid user ID is required.");
      }
      if (!title || typeof title !== "string" || !title.trim()) {
        errors.push("Title is required.");
      }
      if (!type || !["Live Event", "Physical Gallery", "Virtual"].includes(type)) {
        errors.push("Valid exhibition type (Live Event, Physical Gallery, or Virtual) is required.");
      }
      if (!startDate || isNaN(new Date(startDate).getTime())) {
        errors.push("Valid start date is required.");
      }
      if (!endDate || isNaN(new Date(endDate).getTime())) {
        errors.push("Valid end date is required.");
      }
      if (new Date(startDate) > new Date(endDate)) {
        errors.push("Start date cannot be after end date.");
      }

      let parsedEventLocation = {};
      if (eventLocation) {
        parsedEventLocation = typeof eventLocation === "string" ? JSON.parse(eventLocation) : eventLocation;
      }

      if (type !== "Virtual") {
        if (!parsedEventLocation?.address?.trim()) {
          errors.push("Event location address is required for non-virtual exhibitions.");
        }
        if (!parsedEventLocation?.city?.trim()) {
          errors.push("Event location city is required for non-virtual exhibitions.");
        }
        if (!parsedEventLocation?.country?.trim()) {
          errors.push("Event location country is required for non-virtual exhibitions.");
        }
      } else {
        if (!eventUrl || !eventUrl.trim()) {
          errors.push("Event URL is required for virtual exhibitions.");
        }
      }
      if (!dailyTiming || !dailyTiming.trim()) {
        errors.push("Daily timing is required.");
      }
      if (!entryType || !["Free", "Ticket"].includes(entryType)) {
        errors.push("Valid entry type (Free or Ticket) is required.");
      }
      if (entryType === "Ticket" && (!ticketPrice || !ticketPrice.trim())) {
        errors.push("Ticket price is required for ticketed events.");
      }
      if (!language || !language.trim()) {
        errors.push("Language is required.");
      }
      if (!hostedBy || !hostedBy.trim()) {
        errors.push("Hosted by is required.");
      }
      if (!maxCapacity || isNaN(maxCapacity) || Number(maxCapacity) < 1) {
        errors.push("Valid maximum capacity (at least 1) is required.");
      }
      const parsedContactDetails = contactDetails
        ? typeof contactDetails === "string"
          ? JSON.parse(contactDetails)
          : contactDetails
        : {};
      if (!parsedContactDetails?.fullName?.trim()) {
        errors.push("Contact full name is required.");
      }
      if (!parsedContactDetails?.mobileNo?.trim()) {
        errors.push("Contact mobile number is required.");
      }
      if (!parsedContactDetails?.email?.trim()) {
        errors.push("Contact email is required.");
      }
      if (!req.files?.coverBanner || !req.files.coverBanner[0]) {
        errors.push("Cover banner is required.");
      }
      if (!req.files?.logo || !req.files.logo[0]) {
        errors.push("Logo is required.");
      }
      if (eventPromotion && !["Promotion", "Invite"].includes(eventPromotion)) {
        errors.push("Event promotion must be either 'Promotion' or 'Invite'.");
      }
      if (eventPromotion && !["Artist", "Seller"].includes(userType)) {
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

      const parsedEarlyBirdDiscounts = earlyBirdDiscounts
        ? typeof earlyBirdDiscounts === "string"
          ? JSON.parse(earlyBirdDiscounts)
          : earlyBirdDiscounts
        : [];

      const newExhibition = new Exhibition({
        title: title.trim(),
        type,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        eventLocation: parsedEventLocation,
        eventUrl: eventUrl ? eventUrl.trim() : "",
        dailyTiming: dailyTiming.trim(),
        entryType,
        ticketPrice: ticketPrice ? ticketPrice.trim() : "",
        language: language.trim(),
        coverBanner: getFilePath(req.files.coverBanner ? req.files.coverBanner[0] : null),
        logo: getFilePath(req.files.logo ? req.files.logo[0] : null),
        hostedBy: hostedBy.trim(),
        contactDetails: parsedContactDetails,
        guestSpeaker: guestSpeaker ? guestSpeaker.trim() : "",
        earlyBirdDiscounts: parsedEarlyBirdDiscounts,
        maxCapacity: parseInt(maxCapacity),
        liveBidding: liveBidding === "true" || liveBidding === true,
        certificateDistribution: certificateDistribution === "true" || certificateDistribution === true,
        awardDistribution: awardDistribution === "true" || awardDistribution === true,
        eventPromotion: eventPromotion || "Invite",
        userType,
        userId,
      });

      newExhibition.$session(session);
      await newExhibition.save({ session });

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        hasError: false,
        message: "Exhibition created successfully.",
        data: newExhibition,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error creating exhibition:", error);
      return res.status(500).json({
        hasError: true,
        message: "Failed to create exhibition.",
        error: error.message,
      });
    }
  },
];

module.exports = createExhibition;