import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Shipping Routes -------------------------- //

router.post('/create', authenticate , authorize("transport") , controllers.createShipping);

export default router;