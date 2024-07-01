const { AddProduct, UploadPictures, Products, Product, ProductsUpdate, ProductsDelete } = require("../Controllers/ProductsController");
const { photosMiddleware } = require("../Middlewares/PhotosMiddleware");
const router = require("express").Router();

router.post("/uploads",photosMiddleware.array("photos", 5), UploadPictures);

router.post("/addProduct", AddProduct); 
router.get("/products", Products);
router.get("/products/:id", Product);
router.put("/products/", ProductsUpdate);
router.delete("/products/:id", ProductsDelete);






module.exports = router; 