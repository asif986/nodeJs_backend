const Stock = require("../model/stock");
exports.postStock = (req, res, next) => {
  console.log(req.body);

  const Post = new Stock({
    // stockId: req.body.stockId,
    // itemCode: req.body.itemCode,
    // mainProductId: req.body.mainProductId,
    // companyGSTIN: req.body.companyGSTIN,
    subProId: req.body.subProId,
    quantity: req.body.qty,
  });
  Post.save()
    .then((doc) => {
      res.status(201).json({ doc });
    })
    .catch((e) => {
      res.status(500).json({ message: "Stock Not Inserted" });
    });
};

exports.getStocks = (req, res, next) => {
  console.log(req.query);

  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Stock.find();
  let fetchStock;

  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchStock = documents;
      return Stock.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Stocks Fetch Successfully",
        posts: fetchStock,
        maxStock: count,
      });
    })
    .catch((e) => {
      res.status(404).json({ message: "Stocks Not Found" });
    });
};

exports.getStock = (req, res, next) => {
  Stock.findOne({ subProductCode: req.params.id }).then((doc) => {
    if (doc) {
      res.status(200).json({ message: "Stock Fetched", result: doc });
    } else {
      res.status(404).json({ message: "Stock Not Found" });
    }
  });
};

exports.putStock = (req, res, next) => {
  Stock.findOneAndUpdate(
    { subProductCode: req.params.id },
    {
      stockId: req.body.stockId,
      itemCode: req.body.itemCode,
      mainProductId: req.body.mainProductId,
      companyGSTIN: req.body.companyGSTIN,
      subProductCode: req.body.subProductCode,    
      $inc:{ quantity: - req.body.quantity},
     $inc:{ quantity: req.body.quantity},
}, {new:true}
  ).then((doc) => {
    if (doc) {
      res.status(200).json({ message: "Stock Updated Successfully" ,result:doc});
    } else {
      res.status(400).json({ message: "Updation Unsuccessfully" });
    }
  });
};

exports.deleteStock = (req, res, next) => {
  Stock.findOneAndDelete({ subProductCode: req.params.id }).then((doc) => {
    if (doc) {
      res.status(200).json({ message: "Stock Deleted Successfully" ,result:doc});
    } else {
      res.status(400).json({ message: "Deletion Unsuccessfully" });
    }
  });
};
