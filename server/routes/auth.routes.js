const express = require("express");
const AuthController = require("../controllers/auth.controller");
const {body} = require("express-validator");
const Role = require("../models/Role");

const router = express.Router({mergeParams: true});

router.post("/signUp",
    body("email").isEmail(),
    body("password").isLength({min: 8, max: 22}),
    body("username").isLength({min: 3, max: 33}),
    AuthController.signUp);

router.post("/login",
    body("email").isEmail(),
    body("password").notEmpty(),
    AuthController.login);

router.post("/logout", AuthController.logout);

router.post("/token", AuthController.token);



module.exports = router;