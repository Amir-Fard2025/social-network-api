const userRoute = require("express").Router();
const { User } = require("../../models");

// get all users using get request
userRoute.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "error happening while geting all the users" });
  }
});

// get one user using get request by id
userRoute.get("/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    res.json({ user });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ msg: "error happening while retrieving data from data base" });
  }
});

// create a one user using post request
userRoute.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
    });
    res.json({
      newUser,
      msg: "you will see the new user, you can check it in all users",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "error happening while posting a new user" });
  }
});

module.exports = userRoute;
