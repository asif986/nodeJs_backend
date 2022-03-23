const Product = require("../models/product");
const companyController = require("../controller/companys");


exports.postProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const prod = new Product({
      mainProName: req.body.mainProductName,
      mainProCode: req.body.mainProductCode,
      mainProPrice: req.body.mainProductPrice,
      // companyName: req.body.mainProductPrice,
      companyId: req.body.companyId,
    });
    const productCreated = await prod.save();
    res.status(201).json({
      message: "Product Created Successfully",
      result: productCreated,
    });
  } catch (e) {
    res.status(500).json({ message: "Product Creation Unsuccessfully" });
  }
};

exports.getProducuts = (req, res, next) => {
  console.log(req.params);

  // let CompanyData =companyController.getCompanys

  // Product.find().then((doc) => {
  //   if (doc) {
  //     res
  //       .status(200)
  //       .json({ message: "Product Information Fetched", result: doc });
  //   } else {
  //     res.status(404).json({ message: "Product Not Found" });
  //   }
  // });

  Product.aggregate([
    {
      $lookup:
      {
        from: "companies",
        localField: "companyId",
        foreignField: "companyId",
        as: "companyInfo"
      }
    },

    {
      $project: {
        companyId: { $arrayElemAt: ["$companyInfo.companyId", 0] },
        companyName: { $arrayElemAt: ["$companyInfo.companyName", 0] },
        mainProName: "$mainProName",
        mainProCode: "$mainProCode",
        mainProPrice: "$mainProPrice",
        mainProId :"$_id"
      }
    }
  ]).then((result) => {
    let data1 = [];
    // result.map(data =>{
    //   return data1.push( {
    //     mainProName:data.productName,
    //     mainProCode:data.productCode,
    //     mainProPrice:data.productPrice,
    //     companyName:data.companyInfo[0].companyName,
    //     companyId:data.companyInfo[0].companyId

    //   })
    // })
    res.json({ message: "Product Information Fetched", result: result });
  })

};

exports.getProduct = (req, res, next) => {
  Product.findById({ _id: req.params.id }).then((doc) => {
    if (doc) {
      res
        .status(200)
        .json({ message: "Product Information Fetched", result: doc });
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  });
};

exports.putProduct = (req, res, next) => {
  console.log(req.body);

  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        mainProName: req.body.mainProName,
        mainProCode: req.body.mainProCode,
        mainProPrice: req.body.mainProPrice,
        // companyName: req.body.companyName,
        companyId: req.body.companyId,

      }
    },
    { new: true }
  ).then((doc) => {
    if (doc) {
      res
        .status(201)
        .json({ message: "Product Updated Successfully", result: doc });
    } else {
      res.status(500).json({ message: "Product Not Updated" });
    }
  });
};

exports.deleteProduct = (req, res, next) => {
  Product.findByIdAndDelete({ _id: req.params.id }).then((doc) => {
    if (doc) {
      res.status(200).json({ message: "Product Deleted Successfully", result: doc });
    } else {
      res.status(400).json({ message: "Product Is NOT Deleted" });
    }
  });
};
