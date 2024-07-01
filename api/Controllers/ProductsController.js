const Products = require("../Models/Products.js");
const Cart = require('../Models/Cart.js');
const User = require("../Models/User.js");
const fs = require("fs");
const jwt = require("jsonwebtoken");



module.exports.UploadPictures = (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads", ""));
    }
    res.json(uploadedFiles);
  };

module.exports.AddProduct = async (req ,res) => {
  const { token } = req.cookies;


  const {
      productName,
      title,
      price,
      description,
      feature,
      extraInfo,
      type,
      characteristics,
      pictures,  
  } = req.body;

  try {
    const userData = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(userData.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: "Admin privileges required" });

    }
      const productDoc = await Products.create({
          publisher: userData.id,
          productName,
          title,
          price,
          description,
          feature,
          extraInfo,
          type,
          characteristics,
          pictures,
      });

      res.json(productDoc);
  } catch (err) {
      console.error("Error adding product:", err);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.Products = async (req, res) => {
  try {
    res.json(await Products.find());
  }catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.Product = async (req, res) => {
  const { id } = req.params;
  res.json(await Products.findById(id));
};

module.exports.ProductsUpdate = async (req, res) => {
    const { token } = req.cookies;
    const {
      id,
      productName,
      title,
      price,
      description,
      feature,
      extraInfo,
      type,
      characteristics,
      pictures,
    } = req.body;

    try {
      const userData = jwt.verify(token, process.env.TOKEN_KEY);
      const user = await User.findById(userData.id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      if (user.role !== 'admin') {
        return res.status(403).json({ error: "Admin privileges required" });

      }
      const productDoc = await Products.findById(id);
          productDoc.set({
            productName,
            title,
            price,
            description,
            feature,
            extraInfo,
            type,
            characteristics,
            pictures,
          });
          await productDoc.save();
          res.json("ok");
    }catch(err) {
      console.error("Error updating product:", err);
      res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.ProductsDelete = async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  try {
    const userData = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: "Admin privileges required" });

    }

    await Products.findByIdAndDelete(id)
    res.status(200).json({message: "Product deleted successfully"});
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}