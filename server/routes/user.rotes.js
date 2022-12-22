const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router({mergeParams: true});

router.get("/:id", UserController.findUserById);

router.patch("/:id", async (req, res) => {
});

router.get("/favorite/:id", UserController.findFavoriteById);

router.patch("/favorite/:id", UserController.addToFavorite);

router.patch("/favorite/delete/:id", UserController.removeToFavorite);

router.get("/basket/:id", UserController.findBasketById);

module.exports = router;