const mongoose = require("mongoose");

const validateEmail = function (email) {
  // function for email validation
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: "Username is required",
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: "Email address is required",
    unique: true,
    trim: true,
    validate: [validateEmail, "Please fill a valid email address"],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId, //confirm
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId, //confirm
      ref: "User",
    },
  ],
});

// Create a virtual  property to get the amount of friends
userSchema
  .virtual("getFriends")
  // Getter
  .get(function () {
    return this.friends.length;
  });
// Initialize our User model
const User = mongoose.model("User", userSchema);

module.exports = User;
