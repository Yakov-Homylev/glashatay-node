import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';
import { validate } from '@/middlewares/validate';
import * as adsController from '@/modules/ads/ads.controller';
import * as adsSchemas from '@/modules/ads/ads.schemas';

const router = Router();

router.get('/list', adsController.getAds);
router.get('/list/:id', adsController.getAd);
router.post('/create', authMiddleware, validate(adsSchemas.createSchema), adsController.createAd);
router.delete('/delete/:id', authMiddleware, adsController.deleteAd);
router.patch('/list/:id', authMiddleware, validate(adsSchemas.updateSchema), adsController.editAd);

export default router;
