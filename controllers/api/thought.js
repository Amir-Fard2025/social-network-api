const thoughtRoute = require("express").Router();
const { Thought } = require("../../models");

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
    res.status(500).send({ msg: "error happening while geting all thoughts " });
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
      .send({ msg: "error happening while geting thought by its id " });
  }
});

// create one thought using post request and create method

thoughtRoute.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create({
      ...req.body,
    });
    res.json({
      newThought,
      msg: "you see the new user, you can check it in all users",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "error happening while posting a new user" });
  }
});

module.exports = thoughtRoute;
