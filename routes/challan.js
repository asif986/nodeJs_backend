const express = require("express");
const router = new express.Router();

const Challan = require("../models/challan");

const challanController = require("../controller/challan");

router.post("/", challanController.postChallan);

router.get("/:id", challanController.getChallan);

router.get("/", challanController.getChallan);


// router.get("/:id", challanController.getChallan);

// router.put("/:id",challanController.putChallan);

// router.delete("/:id", challanController.deleteChallan)


module.exports=router; 