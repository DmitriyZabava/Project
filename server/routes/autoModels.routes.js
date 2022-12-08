const express = require("express");
const AutoModels = require("../models/AutoModels");

const router = express.Router({mergeParams: true});

router.get("/", async (req, res) => {
    try {
        const autoModels = await AutoModels.find();
        res.status(200).send(autoModels);
    } catch(error) {
        res.status(500).json({
            message: "На сервере произошла ошибкаю Попробуйте позже ..."
        });
    }
});
router.post("/", async (req, res) => {
});
router.patch("/:id", async (req, res) => {
});
router.delete("/:id", async (req, res) => {
});


module.exports = router;