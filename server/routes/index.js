const express = require("express");
const router = express.Router({mergeParams: true});
const authMiddleware = require("../middleware/auth.middleware");

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.rotes"));
router.use("/autoBrand", require("./autoBrand.routes"));
router.use("/autoModels", require("./autoModels.routes"));
router.use("/admin", require("./admin.routes"));


module.exports = router;