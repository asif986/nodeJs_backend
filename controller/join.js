const Company = require("../models/company");
const Product = require("../models/product");
const subProd = require("../models/subProd");

exports.getAll = (req, res, next) => {
  Company.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "companyGSTIN",
        foreignField: "companyGSTIN",
        as: "ProductInfo",
      },
    },

    {
      $lookup: {
        from: "subprods",
        localField: "mainProdCode",
        foreignField: "productCode",
        as: "SubProductInfo",
      },

    },
  ]).exec((err, result) => {
    if (err) {
      res.status(404).json({ message: "Not ound", err });
    } else if (result) {
      res.status(200).json({ Company_Info: result });
    }
  });
};
