const express = require("express");
const router = new express.Router();

const Company = require("../models/company");

const companyController = require("../controller/companys");

router.post("/", companyController.createCompany);

router.get("/", companyController.getCompanys);

router.get("/:id", companyController.getCompany);

router.put("/:id", companyController.putCompany);

router.delete("/:id", companyController.deleteCompany);

module.exports = router;
