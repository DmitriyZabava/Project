const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router({mergeParams: true});

router.get("/:id", UserController.findUserById);

router.patch("/:id", async (req, res) => {
});

module.exports = router;