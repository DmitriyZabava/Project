const express = require("express");
const AutoBrand = require("../models/AutoBrand");

const router = express.Router({mergeParams: true});

router.get("/", async (req, res) => {
    try {
        const autoBrand = await AutoBrand.find();
        res.status(200).send(autoBrand);
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
