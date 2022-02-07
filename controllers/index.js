const router = require("express").Router();
const apiRoutes = require("./api");
// router.use("/api");
router.use("/api", apiRoutes);
router.get("/", (req, res) => {
  res.send("please go to / api");
});

module.exports = router;
