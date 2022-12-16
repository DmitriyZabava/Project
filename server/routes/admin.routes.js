const express = require("express");

const AdminController = require("../controllers/admin.controller");

const router = express.Router({mergeParams: true});

router.get("/model/:id", AdminController.getModelById);
router.post("/model", AdminController.createModel);
router.patch("/model/:id", AdminController.updateModel);
router.delete("/model/:id", AdminController.deleteModel);

router.get("/brand/:id", AdminController.getBrandBYId);
router.post("/brand", AdminController.createBrand);
router.patch("/brand/:id", AdminController.updateBrand);
router.delete("/brand/:id", AdminController.deleteBrand);

router.post("/createModer", AdminController.createModerator);


module.exports = router;