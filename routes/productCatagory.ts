import express from "express";
const productCatagoryController = require("../controller/productCatagoryController");

const router = express.Router();

router.get("/", productCatagoryController.getAllProductCategories);
router.get('/:id', productCatagoryController.getProductCatagoryById);
router.post('/', productCatagoryController.addNewProductCatagory);
router.delete('/:id', productCatagoryController.deleteProductCatagoryById);
router.put('/:id', productCatagoryController.updateProductCatagory);

export default router;
