const mongoose = require("mongoose");
const validator = require("validator");

const subProdSchema = new mongoose.Schema({
    subProductName: {
        type: String,
        required: true
    },
    subProductCode: {
        type: Number,
        required: true,
        
    },
    mainProId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        // uppercase:true,
        required: true,
        ref:"Company"
    }   
})

//creation of new collection
const subProd = new mongoose.model('subProd', subProdSchema);
module.exports = subProd;