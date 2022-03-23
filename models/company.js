const mongoose = require("mongoose");
const validator = require("validator");


const companySchema = mongoose.Schema({
  companyId: {type:mongoose.Schema.Types.ObjectId},
  companyName: { type: String, require: true,trim:true },
  companyGSTIN: {
    type: String,
    require: true,
    // unique: true,
    // minlength: 15,
    // maxlength: 15,
    uppercase: true,
  },
  companyState: { type: String, require: true },
  companyStateCode: { type: Number, require: true },
  companyAddress: { type: String, require: true },
});

module.exports = mongoose.model("Company", companySchema);
