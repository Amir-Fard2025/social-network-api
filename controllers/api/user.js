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
      .send({ msg: "error happening while getting the user by its id" });
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

// delete one user using  delete request and findOneAndRemove method
userRoute.delete("/:id", async (req, res) => {
  try {
    const user = await User.findOneAndRemove({
      _id: req.params.id,
    });
    if (!user) {
      res.status(404).json({ message: "There is no thought with this id" });
    } else {
      res.json({ message: "User has been deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "error happening while deleting the user using its unique id",
    });
  }
});
// update one user using put request and findOneAndUpdate method
userRoute.put("/:id", async (req, res) => {
  try {
    const newUser = await User.findOneAndUpdate({
      _id: req.params.userId,
      $set: req.body,
      runValidators: true,
      new: true,
    });
    if (!newUser) {
      res.json({ msg: "The user with such an id is not available" });
    } else {
      res.json({
        newUser,
        msg: "The user's data has successfully updated",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: "error happening while updating the user using its unique id ",
    });
  }
});

module.exports = userRoute;
