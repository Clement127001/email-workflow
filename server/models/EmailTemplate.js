const mongoose = require("mongoose");

const EmailTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
      minlength: 3,
      maxlength: 30,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      maxlength: 50,
    },
    body: { type: String, required: [true, "Email body is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailTemplate", EmailTemplateSchema);
