import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Inspect Log Routes -------------------------- //

router.get('/mine', authenticate , authorize("border") , controllers.getBorderLogs);

export default router;