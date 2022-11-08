const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    "en-US": {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    "ar-BH": {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    category: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = ProductSchema;
