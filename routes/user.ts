import express from 'express';
import { userController } from '../controller/users_controller';

const router = express.Router();

router.get('/', userController);

export default router;