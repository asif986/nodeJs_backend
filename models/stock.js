const mongoose = require("mongoose");
const validator = require("validator");

const stockSchema = mongoose.Schema({
    // stockId: { type: String },
    // itemCode: { type: String },
    // companyGSTIN:{type:String,required:true,uppercase:true},
    // subProductCode:{type:String,require:true},
    mainProductId: { type: mongoose.Schema.Types.ObjectId },
    subProId: { type: mongoose.Schema.Types.ObjectId },
    qty: { type: Number }
});

module.exports = mongoose.model("Stock", stockSchema);
