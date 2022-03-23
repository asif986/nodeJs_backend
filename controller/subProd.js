const subProd = require("../models/subProd");
const mongoose = require('mongoose');
const Stock = require("../models/stock");


exports.createSubProd = (req, res) => {
    console.log(req.body);
    const subProd1 = new subProd({
        subProductName: req.body.subProductName,
        subProductCode: +req.body.subProductCode,
        mainProId: req.body.mainProId,
        companyId: req.body.companyId
    });

    subProd1.save().then((result) => {
        stockData = new Stock({
            subProId: result._id,
            mainProductId:result.mainProId,
            qty: 0,
        });
        stockData.save().then(()=>{
            res.status(201).json({
                message: "data created successfully",
                createSubPro: subProd
            });
        })
    }).catch((e) => {
        console.log(e);
        res.status(400).json({
            error: e
        });
    })

}
exports.getSubProd = async (req, res) => {

    let data = [];
    try {
        if (req.query.companyId !== 'undefined' ) {
            console.log(req.query)
            data = subProd.aggregate([
                {
                    $match: { companyId: mongoose.Types.ObjectId(req.query.companyId) }
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "mainProId",
                        foreignField: "_id",
                        as: "product_data"
                    }
                },
                {
                    $unwind: "$product_data"
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "companyId",
                        foreignField: "companyId",
                        as: "company_data"
                    }
                },
                {
                    $unwind: "$company_data"
                },
                {
                    $project: {
                        subProName: "$subProductName",
                        subProCode: "$subProductCode",
                        mainProName: "$product_data.mainProName",
                        companyName: "$company_data.companyName",
                        subProId: "$_id",
                        // mainProPrice: "$mainProPrice",
                        // mainProId: "$_id"
                    }
                }
            ])
        } else {
            console.log("all Subpro Info");
            data = subProd.aggregate([
                {
                    $lookup: {
                        from: "products",
                        localField: "mainProId",
                        foreignField: "_id",
                        as: "product_data"
                    }
                },
                {
                    $unwind: "$product_data"
                },
                {
                    $lookup: {
                        from: "companies",
                        localField: "companyId",
                        foreignField: "companyId",
                        as: "company_data"
                    }
                },
                {
                    $unwind: "$company_data"
                },
                {
                    $project: {
                        subProName: "$subProductName",
                        subProCode: "$subProductCode",
                        mainProName: "$product_data.mainProName",
                        companyName: "$company_data.companyName",
                        subProId: "$_id",
                        // mainProPrice: "$mainProPrice",
                        // mainProId: "$_id"
                    }
                }
            ])
        }
        data.then((result) => {
            res.json({
                message: "data fetched successfully",
                getSubPro: result
            });
        });
        // const subProdData = await subProd.find();

    } catch (e) {
        res.send(e);
    }
}

exports.updateSubProd = async (req, res) => {
    try {
        console.log(req.params.id);
        const _id = req.params.id;
        const data = {
            subProductName: req.body.subProName,
            subProductCode: req.body.subProCode

        }
        const updateSubProd = await subProd.findByIdAndUpdate(_id, data, {
            new: true
        });
        console.log(updateSubProd);
        res.status(200).json({
            message: "Data updated successfully",
            updateSubPro: updateSubProd
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: "data not updated successfully",
            error: e
        });
    }
}

exports.deleteSubProd = async (req, res) => {
    try {
        const deleteSubProd = await subProd.findByIdAndDelete(req.params.id);
        if (!req.params.id) {
            return res.status(400).send();
        }
        res.json({
            message: "data deleted successfully",
            deleteSubPro: deleteSubProd
        });
    } catch (e) {
        res.status(500).send(e);
    }
}