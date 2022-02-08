const mongoose = require("mongoose");
const moment = require("moment");
// To Do: use moment.js to format time
const myGetTime = (dateTime) => {
  moment().format("MMMM Do YYYY, h:mm:ss a");
  return dateTime;
};
// Define reactionsSchema
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "Text is required",
    maxlength: 280,
  },
  username: {
    type: String,
    required: "Username is required",
  },
  ceratedAt: {
    type: Date,
    default: Date.now,
    // get: (dateTime) => myGetTime(dateTime),
  },
});
// Define thoughtsSchema
const thoughtsSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 50,
    minlength: 4,
    default: "Unnamed text",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // get: (dateTime) => myGetTime(dateTime),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thoughts = mongoose.model("Thought", thoughtsSchema);

module.exports = Thoughts;
