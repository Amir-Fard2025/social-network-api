const thoughtRoute = require("express").Router();
const { Thought } = require("../../models");
const { User } = require("../../models");
const userRoute = require("./user");
// get all the thoughts using get request
thoughtRoute.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json({
      thoughts,
      msg: "you see all the thoughts here",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ msg: "error happening while getting all thoughts " });
  }
});
// get one thought using get request
thoughtRoute.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.find({ _id: req.params.id });
    res.json({
      thought,
      msg: "you see the thought by its unique id here",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ msg: "error happening while getting thought by its id " });
  }
});
// create one thought using post request and create method
thoughtRoute.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create({
      ...req.body,
    });
    if (newThought) {
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: newThought._id } }
      );
    }
    res.json({
      newThought,
      msg: "you see the new user, you can check it in all users",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "error happening while posting a new user" });
  }
});
// delete one thought using  delete request and findOneAndRemove method
thoughtRoute.delete("/:id", async (req, res) => {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.id,
    });
    if (!thought) {
      res.status(404).json({ message: "There is no thought with this id" });
    } else {
      res.json({ message: "Thought has been deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "error happening while deleting the thought using its unique id",
    });
  }
});
// Update one thought using put request and findOneAndUpdate method
thoughtRoute.put("/:id", async (req, res) => {
  try {
    const newThought = await Thought.findOneAndUpdate({
      _id: req.params.thoughtId,
      $set: req.body,
      runValidators: true,
      new: true,
    });
    if (!newThought) {
      res.json({ msg: "The thought with such an id is not available" });
    } else {
      res.json({
        newThought,
        msg: "The thought's data has been successfully updated",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "error happening while updating the thought using its unique id",
    });
  }
});
// Create a reaction using post request
thoughtRoute.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const newReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
    );
    const newId = req.params.thoughtId;
    console.log(newId);
    res.json({
      newReaction,
      msg: `A new Reaction has been added to the thought with this Id:${newId} `,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "error happening while creating a new reaction to a thougth",
    });
  }
});
module.exports = thoughtRoute;
