const express = require("express");
const router = express.Router();
const tipoMaterialController = require("../controllers/tipomaterialController");

router.get("/", tipoMaterialController.getAll);

module.exports = router;
