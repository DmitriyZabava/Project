const express = require("express");
const AuthController = require("../controllers/auth.controller");
const {check} = require("express-validator");
const Role = require("../models/Role");

const router = express.Router({mergeParams: true});

router.post("/signUp",
    check("email", "Некорректный email").isEmail(),
    check("password", "Пароль должен содержать минимум 8 символов").isLength({min: 8, max: 22}),
    check("username", "Имя должно содержать минимум 3 символа").isLength({min: 3, max: 33}),
    AuthController.signUp);

router.post("/login",
    check("email", "Не верное сочетание email и пароль").normalizeEmail().isEmail(),
    check("password", "Не верное сочетание email и пароль").notEmpty(),
    AuthController.login);

router.post("/logout", AuthController.logout);

router.post("/token", AuthController.token);


module.exports = router;