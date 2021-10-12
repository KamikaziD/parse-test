import express from 'express';
import { addUserController } from '../controller/users_controller';

const router = express.Router();

router.post('/', addUserController);

export default router;