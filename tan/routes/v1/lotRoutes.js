import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Lot Routes -------------------------- //

router.get('/mine', authenticate , authorize("farmer" , "house") , controllers.myLot);
router.get('/contents/:id', authenticate , authorize("farmer" , "house") , controllers.getLotContents);
router.post('/create', authenticate , authorize("house") , controllers.createLot);
router.put('/edit/:id', authenticate , authorize("house") , controllers.editLot);
router.put('/assign', authenticate , authorize("house") , controllers.assignToShipping);
router.put('/unassign', authenticate , authorize("house") , controllers.unassignToShipping);

export default router;