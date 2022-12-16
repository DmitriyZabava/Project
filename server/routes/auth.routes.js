const express = require("express");
const AuthController = require("../controllers/auth.controller");
const {body} = require("express-validator");
const Role = require("../models/Role");

const router = express.Router({mergeParams: true});

router.post("/signUp",
    body("email", "Некорректный email").isEmail(),
    body("password", "Пароль должен содержать минимум 8 символов").isLength({min: 8, max: 22}),
    body("username", "Имя должно содержать минимум 3 символа").isLength({min: 3, max: 33}),
    AuthController.signUp);

router.post("/login",
    body("email", "Не верное сочетание email и пароль").normalizeEmail().isEmail(),
    body("password", "Не верное сочетание email и пароль").notEmpty(),
    AuthController.login);

router.post("/logout", AuthController.logout);

router.post("/token", AuthController.token);


module.exports = router;