const express = require("express");
const router = express.Router();
const Product = require("../models/Products"); // Adjust the path as needed for your Product model

// Route to display all products
router.get("/ProductDisplay", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// Route to add a new product
router.post("/ProductAdd", async (req, res) => {
  try {
    const {
      ProductName,
      Price,
      Description,
      Sizes,
      Images,
      Features,
      CompositionAndCare,
      SizeChart,
      InStock,
      ProductType,
      Status,
      Category,
    } = req.body;

    const newProduct = new Product({
      ProductName,
      Price,
      Description,
      Sizes,
      Images,
      Features,
      CompositionAndCare,
      SizeChart,
      InStock,
      ProductType,
      Status,
      Category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error adding product", error });
  }
});

// Route to update a product by ID
router.put("/ProductUpdate/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error updating product", error });
  }
});

// Route to delete a product by ID
router.delete("/ProductDelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
