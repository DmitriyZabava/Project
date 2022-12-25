const express = require("express");
const router = express.Router({mergeParams: true});
const authMiddleware = require("../middleware/auth.middleware");
const roleAccessMiddleware = require("../middleware/roleAccess.middleware");

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/autoBrand", require("./autoBrand.routes"));
router.use("/autoModels", require("./autoModels.routes"));
router.use("/descriptions", require("./descriptions.routes"));
router.use("/admin", roleAccessMiddleware(["MODERATOR", "ADMIN"]), require("./admin.routes"));


module.exports = router;