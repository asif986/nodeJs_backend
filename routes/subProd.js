const express = require('express');
const router = express.Router();
const subProdController = require("../controller/subProd");

router.post("", subProdController.createSubProd);
router.get("", subProdController.getSubProd);
router.patch("/:id", subProdController.updateSubProd);
router.delete("/:id", subProdController.deleteSubProd);

module.exports = router;