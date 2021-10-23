import express from "express";
const suppliersController = require("../controller/suppliersController");

const router = express.Router();

router.get("/", suppliersController.getAllSuppliers);
router.get('/:id', suppliersController.getSupplierById);
router.post('/', suppliersController.addNewSupplier);
router.delete('/:id', suppliersController.deleteSupplierById);
router.put('/:id', suppliersController.updateSupplier);

export default router;
