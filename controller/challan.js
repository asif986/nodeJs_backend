const mongoose = require('mongoose');
const Challan = require("../models/challan");
const Stock = require("../models/stock");
const subProd = require("../models/subProd");


exports.postChallan = (req, res) => {
    
     isdataInserted =false;
    const challanData = new Challan({
        challanDate: req.body.challanDate,
        challanNo: +req.body.challanNo,
        challanInfo: req.body.challanInfo,
    });
    challanData.save().then((result) => {
        console.log(result);
        result.challanInfo.forEach(r => {
            console.log(r.subProId);
            updateStock = Stock.findOneAndUpdate(
                { subProId: mongoose.Types.ObjectId(r.subProId) },
                {
                    $inc: { qty: r.qty },
                }, { new: true }
            ).then(r=>{
                 console.log('data saved');
                 this.isdataInserted =true;
            })
        });

        if(this.isdataInserted ==true){
            res.status(201).json({ message: "challan added. Stock Updated" });
        }else{

            res.status(500).json({ message: "Stock Not Inserted" });
        }
        
    }).catch((e) => {
        console.log(e);
        res.status(400).json({
        error: e
        });
    })

}

exports.getChallan = async (req, res) => {
    // console.log(req)
    console.log(req.params.id);
    const c_id = req.params.id;
    try {
        Challan.aggregate([
            // {
            //     $match: { _id: mongoose.Types.ObjectId(c_id) }
            // },

            {
                $lookup: {
                    from: "subprods",
                    localField: "challanInfo.subProId",
                    foreignField: "_id",
                    as: "product_data"
                }
            },
            // {
            //     $unwind: "$product_data"
            // },
            // {
            //     $lookup: {
            //         from: "companies",
            //         localField: "companyId",
            //         foreignField: "companyId",
            //         as: "company_data"
            //     }
            // },
            // {
            //     $unwind: "$company_data"
            // },
            // {
            //     $project: {
            //         subProductName: "$subProductName",
            //         subProductCode: "$subProductCode",
            //         mainProName: "$product_data.mainProName",
            //         companyName: "$company_data.companyName",
            //         // mainProPrice: "$mainProPrice",
            //         // mainProId: "$_id"
            //     }
            // }
        ]).then((result) => {
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
        const updateSubProd = await subProd.findByIdAndUpdate(_id, req.body, {
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