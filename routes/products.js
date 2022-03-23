const express = require("express");
const router = new express.Router();

const Product = require("../models/product");

const productController = require("../controller/products");

router.post("/", productController.postProduct);

router.get("/", productController.getProducuts);

router.get("/:id", productController.getProduct);

router.put("/:id",productController.putProduct);

router.delete("/:id", productController.deleteProduct)


module.exports=router; 