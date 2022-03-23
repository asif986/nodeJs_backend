const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema({
  mainProId: { type: mongoose.Schema.Types.ObjectId },
  mainProName: { type: String, require: true },
  mainProCode: { type: String, require: true },
  mainProPrice: { type: Number, require: true },
  companyName: { type: String },
  companyId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Company" },
});

module.exports = mongoose.model("Product", productSchema);
