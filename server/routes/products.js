// File Name: product.js
// Student Name: Marco Favaretto
// Student ID: 301186334
// Date: 10/24/2022

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  // find all products in the products collection
  product.find((err, products) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("products/index", {
        title: "Products",
        products: products
      });
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("products/add", {
    title: "Add Product",
  });
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newProduct = product({
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.price
  });
  product.create(newProduct, (err, product) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the product list
      res.redirect("/products");
    }
  });
});

// GET the Product Details page in order to edit an existing Product
router.get("/details/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;


  product.findById(id, (err, producttoedit) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("products/details", {title: "Edit Product", product: producttoedit});
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  let updateproduct = product({
    _id: id,
    Productid: req.body.Productid,
    Productname: req.body.Productname,
    Description: req.body.Description,
    Price: req.body.price,
  });
  product.updateOne({_id: id}, updateproduct, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});

// GET - process the delete
// This code will delete all products in the database for which the price matches the specified range 
router.get("/delete/:minPrice/:maxPrice", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let minP = req.params.minPrice;
  let maxP = req.params.maxPrice;

  product.deleteMany({$and: [ { Price: {$gte: minP}}, {Price: {$lte: maxP}}]}, (err) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/products");
    }
  });
});
module.exports = router;
