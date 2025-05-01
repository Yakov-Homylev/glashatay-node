import { Router } from 'express';
import { validate } from '@/middlewares/validate';
import { authMiddleware } from '@/middlewares/auth';
import * as authController from '@/modules/auth/auth.controller';
import * as authSchemas from '@/modules/auth/auth.schemas';

const router = Router();

router.post('/registration', validate(authSchemas.registartionSchema), authController.registration);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authMiddleware, authController.logout);

export default router;
