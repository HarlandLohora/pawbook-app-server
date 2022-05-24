const router = require("express").Router();
const authRoutes = require("./auth.routes");

const petRoutes = require("./pet.routes");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);

router.use("/mascotas", petRoutes);

module.exports = router;
