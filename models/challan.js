const mongoose = require("mongoose");
const validator = require("validator");

const challanSchema = new mongoose.Schema({
    challanDate: {
        type: String,
        required: true
    },
    challanNo: {
        type: Number,
        required: true,
        
    },
    challanInfo: [{
        _id: false,
        subProId:{ type: mongoose.Schema.Types.ObjectId },
        qty:Number
    }],

})

//creation of new collection
const Challan = new mongoose.model('Challan', challanSchema);
module.exports = Challan;