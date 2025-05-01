import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import * as userController from '@/modules/user/user.contoller';
import * as userSchemas from '@/modules/user/user.schemas';

const router = Router();

router.get('/iam', authMiddleware, userController.getCurrentUser);
router.get('/list/:id', userController.getUserInfo);
router.patch('/list/:id', authMiddleware, validate(userSchemas.updateSchema), userController.updateUser);

export default router;
