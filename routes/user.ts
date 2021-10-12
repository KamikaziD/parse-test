import express from 'express';
const usersController = require("../controller/usersController");
//import { userController } from '../controller/usersController';

const router = express.Router();

router.get('/:id', usersController.getUserById);

export default router;