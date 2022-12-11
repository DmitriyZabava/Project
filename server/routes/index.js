const express = require("express");
const router = express.Router({mergeParams: true});

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.rotes"));
router.use("/autoBrand", require("./autoBrand.routes"));
router.use("/autoModels", require("./autoModels.routes"));

module.exports = router;