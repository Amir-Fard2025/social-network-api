const mongoose = require("mongoose");
// To Do: use moment.js to format time
const myGetTime = (dateTime) => {
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
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  ceratedAt: {
    type: Date,
    default: Date.now,
    get: (dateTime) => myGetTime(dateTime),
  },
});
// Define thoughtsSchema
const thoughtsSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (dateTime) => myGetTime(dateTime),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

const Thoughts = mongoose.model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
