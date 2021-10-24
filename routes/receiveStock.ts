import express from 'express';
const receiveStockController = require('../controller/receiveStockController');

const router = express.Router();

router.get('/', receiveStockController.getReceivedStock);
router.get('/:id', receiveStockController.getReceivedStockById);

export default router;