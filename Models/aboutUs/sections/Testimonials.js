
// const mongoose = require("mongoose");

// const TestimonialSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
// });

// const TestimonialsSchema = new mongoose.Schema(
//   {
//    // aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs", required: true },
//     mainHeading: { type: String, required: true },
//     mainDescription: { type: String, required: true },
//     testimonials: { type: [TestimonialSchema], default: [] },
//     //status: { type: String, enum: ["draft", "published"], default: "draft" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Testimonials", TestimonialsSchema);


const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const TestimonialsSchema = new mongoose.Schema(
  {aboutUsId: { type: mongoose.Schema.Types.ObjectId, ref: "AboutUs" },
    mainHeading: {
      type: String,
      required: true,
      default: "What Our Clients Say",
    },
    mainDescription: {
      type: String,
      required: true,
      default:
        "Our clients’ feedback inspires us to continue delivering excellence and innovation in every project we take on.",
    },
    testimonials: {
      type: [TestimonialSchema],
      default: [
        {
          name: "John Doe",
          description:
            "The team exceeded our expectations. Their professionalism and attention to detail were outstanding.",
        },
        {
          name: "Jane Smith",
          description:
            "Working with them was a seamless experience. We saw measurable improvements in our project outcomes.",
        },
        {
          name: "Michael Brown",
          description:
            "Highly recommended. They understood our requirements perfectly and delivered beyond expectations.",
        },
      ],
    },
  },
  { timestamps: true }
);

TestimonialsSchema.statics.ensureDefault = async function (aboutUsId) {
  let doc = await this.findOne({ aboutUsId });
  if (!doc) {
    await this.create({
      aboutUsId,
      mainHeading: "What Our Clients Say",
      mainDescription:
        "Our clients’ feedback inspires us to continue delivering excellence and innovation in every project we take on.",
      testimonials: [
        {
          name: "John Doe",
          description:
            "The team exceeded our expectations. Their professionalism and attention to detail were outstanding.",
        },
        {
          name: "Jane Smith",
          description:
            "Working with them was a seamless experience. We saw measurable improvements in our project outcomes.",
        },
        {
          name: "Michael Brown",
          description:
            "Highly recommended. They understood our requirements perfectly and delivered beyond expectations.",
        },
      ],
    });
    console.log("Default Testimonials document created");
  } else {
    console.log("Testimonials document already exists");
  }
};

module.exports = mongoose.model("Testimonials", TestimonialsSchema);
