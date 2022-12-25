const express = require("express");

const UserController = require("../controllers/user.controller");

const router = express.Router({mergeParams: true});

router.get("/:id", UserController.findUserById);

router.get("/favorite/:id", UserController.findFavoriteById);

router.patch("/favorite/:id", UserController.addToFavorite);

router.patch("/favorite/delete/:id", UserController.removeFromFavorite);

router.get("/basket/:id", UserController.findBasketById);

router.patch("/basket/:id", UserController.addToBasket);

router.patch("/basket/delete/:id", UserController.removeFromBasket);

router.patch("/basket/increment/:id", UserController.incrementModel);

router.patch("/basket/decrement/:id", UserController.decrementModel);

module.exports = router;