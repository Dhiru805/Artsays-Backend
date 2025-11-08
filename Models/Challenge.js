// const mongoose = require("mongoose");

// const challengeSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         title: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         type: {
//             type: String,
//             required: true,
//             trim: true,
//         },

//         description: {
//             type: String,
//             required: true,
//         },

//         startDate: {
//             type: String,
//             required: true,
//         },

//         endDate: {
//             type: String,
//             required: true,
//         },

//         submissionDeadline: {
//             type: String,
//             required: true,
//         },

//         entryFee: {
//             type: String,
//             required: true,
//         },

//         prizeDetails: {
//             type: String,
//             required: true,
//         },

//         judgingCriteria: {
//             type: String,
//             required: true,
//         },

//         maxParticipants: {
//             type: Number,
//             default: null,
//         },

//         tags: {
//             type: [String],
//             required: true,
//         },

//         bannerImage: {
//             type: String,
//             required: true,
//         },

//         status: {
//             type: String,
//             enum: ["draft", "live", "closed"],
//             required: true,
//             default: "draft",
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// module.exports = mongoose.model("Challenge", challengeSchema);

const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      trim: true,
      default: '',
    },
    type: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    startDate: {
      type: String,
      default: '',
    },
    endDate: {
      type: String,
      default: '',
    },
    submissionDeadline: {
      type: String,
      default: '',
    },
    entryFee: {
      type: String,
      default: '',
    },
    prizeDetails: {
      type: String,
      default: '',
    },
    judgingCriteria: {
      type: String,
      default: '',
    },
    maxParticipants: {
      type: Number,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    bannerImage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ["draft", "live", "closed"],
      required: true,
      default: "draft",
    },
    rules: {
      type: String,
      required: true,
      default: ""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Challenge", challengeSchema);
