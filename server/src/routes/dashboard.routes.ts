import { Router } from 'express';
import { getSummary } from '../controllers/dashboard.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect);
router.get('/summary', getSummary);

export default router;
