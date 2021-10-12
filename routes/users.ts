import express from "express";
import { usersController } from "../controller/users_controller";

const router = express.Router();

router.get("/", usersController);

export default router;
