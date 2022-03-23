const Company = require("../models/company");
const mongoose = require("mongoose");

exports.createCompany = async (req, res, next) => {
  try {
    console.log(req.body);
    //const url = req.protocol + "://" + req.get("host");
    const post = new Company({
      companyId:new mongoose.Types.ObjectId(),
      companyName: req.body.companyName,
      companyGSTIN: req.body.companyGSTIN,
      companyState: req.body.companyState,
      companyStateCode: req.body.companyStateCode,
      companyAddress: req.body.companyAddress,
    });
    const createDocument = await post.save();
    res.status(201).json({
      message: "Company Data Inserted Successfully",
      result: createDocument,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Company Data Insertion Unsuccessful" });
  }
};

exports.getCompanys = (req, res, next) => {
  console.log(req.query);

  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Company.find();
  let fetchCompany;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchCompany = documents;
      return Company.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Companies Fetch Successfully",
        companys: fetchCompany,
        maxCompany: count,
      });
    });
};

exports.getCompany = (req, res, next) => {
console.log(req.params)
Company.findOne({ companyGSTIN: req.params.id }).then((doc) => {
  if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({ message: "Company Not Found" });
    }
  });
};

exports.putCompany = (req, res, next) => {
  console.log(req.params);

  Company.findOneAndUpdate(
    { companyId: req.params.id },
    { $set:{
      companyName: req.body.companyName,
      companyGSTIN: req.body.companyGSTIN,
      companyState: req.body.companyState,
      companyStateCode: req.body.companyStateCode,
      companyAddress: req.body.companyAddress,
    }
    },
    { new: true }
  ).then((doc) => {
    if (doc) {
      res.status(202).json({
        message: "Update Successfully",
        result: doc,
      });
    } else {
      res.status(404).json({ message: "Company Not Found" });
    }
  });
};

exports.deleteCompany = (req, res, next) => {
  Company.findOneAndDelete({ companyGSTIN: req.params.id }).then((doc) => {
    if (doc) {
      res.status(200).json({
        message: "Delete Successfully",
        result: doc,
      });
    } else {
      res.status(400).json({ message: "Deletion Unsuccessful" });
    }
  });
};
