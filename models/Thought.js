const mongoose = require("mongoose");
const moment = require("moment");
// To Do: use moment.js to format time
const myGetTime = function (dateTime) {
  return moment(dateTime).format("MMMM Do YYYY, h:mm:ss a");
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
    get: myGetTime,
  },
});
// Define thoughtsSchema
const thoughtsSchema = new mongoose.Schema(
  {
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
      get: myGetTime,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

thoughtsSchema
  .virtual("numberOfReactions")
  // Getter
  .get(function () {
    if (!this.reactions) {
      return 0;
    }
    return this.reactions.length;
  });

const Thoughts = mongoose.model("Thought", thoughtsSchema);

module.exports = Thoughts;
