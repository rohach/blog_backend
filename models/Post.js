const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    desc: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
      require: true,
    },
    photo: {
      type: String,
      require: false,
      default: "",
    },
    categories: {
      type: Array,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
