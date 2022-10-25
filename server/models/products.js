// File Name: products.js
// Student Name: Marco Favaretto
// Student ID: 301186334
// Date: 10/24/2022

let mongoose = require("mongoose");

// create a model class
let Product = mongoose.Schema(
  {
    Productid: String,
    Productname: String,
    Description: String,
    Price: Number,
  },
  {
    collection: "products"
  }
);

module.exports = mongoose.model("Product", Product);
