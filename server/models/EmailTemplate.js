const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name must be at most 30 characters"],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      minlength: [4, "Subject must be at least 4 characters"],
      maxlength: [50, "Subject must be at most 50 characters"],
    },
    body: {
      type: String,
      required: [true, "Email body is required"],
      minlength: [40, "Email body must be at least 40 characters"],
      maxlength: [2500, "Email body must be at most 2500 characters"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema);
