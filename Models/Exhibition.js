const mongoose = require("mongoose");

const exhibitionSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: [true, "User type is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Exhibition type is required"],
      enum: ["Live Event", "Physical Gallery", "Virtual"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    eventLocation: {
      address: {
        type: String,
        required: [
          function () {
            return this.type !== "Virtual";
          },
          "Event location address is required for non-virtual exhibitions",
        ],
        trim: true,
      },
      city: {
        type: String,
        required: [
          function () {
            return this.type !== "Virtual";
          },
          "Event location city is required for non-virtual exhibitions",
        ],
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        required: [
          function () {
            return this.type !== "Virtual";
          },
          "Event location country is required for non-virtual exhibitions",
        ],
        trim: true,
      },
      pin: {
        type: String,
        trim: true,
      },
      googleMapUrl: {
        type: String,
        trim: true,
      },
    },
    eventUrl: {
      type: String,
      required: [
        function () {
          return this.type === "Virtual";
        },
        "Event URL is required for virtual exhibitions",
      ],
      trim: true,
    },
    dailyTiming: {
      type: String,
      required: [true, "Daily timing is required"],
      trim: true,
    },
    entryType: {
      type: String,
      required: [true, "Entry type is required"],
      enum: ["Free", "Ticket"],
    },
    ticketPrice: {
      type: String,
      required: [
        function () {
          return this.entryType === "Ticket";
        },
        "Ticket price is required for ticketed events",
      ],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
    coverBanner: {
      type: String,
    },
    logo: {
      type: String,
    },
    hostedBy: {
      type: String,
      required: [true, "Hosted by is required"],
      trim: true,
    },
    contactDetails: {
      fullName: {
        type: String,
        required: [true, "Contact full name is required"],
        trim: true,
      },
      mobileNo: {
        type: String,
        required: [true, "Contact mobile number is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Contact email is required"],
        trim: true,
      },
      address: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      pin: {
        type: String,
        trim: true,
      },
    },
    guestSpeaker: {
      type: String,
      trim: true,
      default: "",
    },
    earlyBirdDiscounts: [
      {
        code: {
          type: String,
          trim: true,
        },
        discount: {
          type: Number,
          min: [0, "Discount must be a positive number"],
          max: [100, "Discount cannot exceed 100%"],
        },
      },
    ],
    maxCapacity: {
      type: Number,
      required: [true, "Maximum capacity is required"],
      min: [1, "Maximum capacity must be at least 1"],
    },
    liveBidding: {
      type: Boolean,
      default: false,
    },
    certificateDistribution: {
      type: Boolean,
      default: false,
    },
    awardDistribution: {
      type: Boolean,
      default: false,
    },
    eventPromotion: {
      type: String,
      enum: ["Promotion", "Invite"],
      default: "Invite",
    },
   status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
     rejectComment: { type: String },
  },
  { timestamps: true }
);

exhibitionSchema.index(
  { "earlyBirdDiscounts.code": 1 },
  { unique: true, partialFilterExpression: { "earlyBirdDiscounts.code": { $exists: true } } }
);

module.exports = mongoose.model("Exhibition", exhibitionSchema);