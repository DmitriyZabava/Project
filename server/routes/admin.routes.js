const express = require("express");

const AdminController = require("../controllers/admin.controller");

const router = express.Router({mergeParams: true});

router.get("/model/get/:id", AdminController.getModelById);
router.post("/model/create", AdminController.createModel);
router.patch("/model/update/:id", AdminController.updateModel);
router.delete("/model/delete/:id", AdminController.deleteModel);

router.get("/brand/get/:id", AdminController.getBrandBYId);
router.post("/brand/create", AdminController.createBrand);
router.patch("/brand/update/:id", AdminController.updateBrand);
router.delete("/brand/delete/:id", AdminController.deleteBrand);

router.post("/createModerator", AdminController.createModerator);


module.exports = router;