import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Lot Routes -------------------------- //

router.post('/create', authenticate , authorize("house") , controllers.createLot);
router.put('/assign', authenticate , authorize("house") , controllers.assignLot);
router.put('/edit/:id', authenticate , authorize("house" , "transport" , "ministry") , controllers.editLot);

export default router;