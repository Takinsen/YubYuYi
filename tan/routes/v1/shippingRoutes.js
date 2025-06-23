import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Shipping Routes -------------------------- //

router.get('/mine', authenticate , authorize("house") , controllers.myShipping);
router.put('/edit/:id', authenticate , authorize("house") , controllers.editShipping);
router.post('/create', authenticate , authorize("house") , controllers.createShipping);

export default router;