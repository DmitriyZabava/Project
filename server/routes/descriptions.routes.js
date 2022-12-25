const express = require("express");
const Descriptions = require("../models/Description");

const router = express.Router({mergeParams: true});

router.get("/", async (req, res, next) => {
    try {
        const descriptions = await Descriptions.find();
        res.status(200).send(descriptions);
    } catch(error) {
        res.status(500).json({
            message: "Internal Server Error"
        });

    }
});
module.exports = router;