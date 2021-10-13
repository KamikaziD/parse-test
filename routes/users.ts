import express from "express";
const usersController = require("../controller/usersController");

const router = express.Router();

router.get("/", usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.addNewUser);
router.delete('/:id', usersController.deleteUserById);
router.put('/:id', usersController.updateUser);

export default router;
