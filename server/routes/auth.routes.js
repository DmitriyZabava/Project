const express = require("express");
const AuthController = require("../controllers/auth.controller");
const {body} = require("express-validator");
const Role = require("../models/Role");

const router = express.Router({mergeParams: true});

router.post("/signUp",
    body("email").isEmail(),
    body("password").isLength({min: 8, max: 22}),
    body("username").isLength({min: 3, max: 33})
    , AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/refreshToken", AuthController.refreshToken);
router.get("/users", async (req, res, next) => {
    try {
        const userRole = new Role();
        const adminRole = new Role({role: "ADMIN"});
        const moderRole = new Role({role: "MODERATOR"});
        await userRole.save();
        await adminRole.save();
        await moderRole.save();
        res.json("role created")
    } catch(e) {

    }
});

module.exports = router;