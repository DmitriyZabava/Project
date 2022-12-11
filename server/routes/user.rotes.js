const express = require("express");
const User = require("../models/User");

const router = express.Router({mergeParams: true});

router.get("/", async (req, res) => {
    // try {
    //     const user =await User.findById("_id");
    //     res.status(200).send(user);
    // } catch(error) {
    //     res.status(500).json({
    //         message: "На сервере произошла ошибкаю Попробуйте позже ..."
    //     });
    // }
});
router.patch("/:id", async (req, res) => {
});

module.exports = router;