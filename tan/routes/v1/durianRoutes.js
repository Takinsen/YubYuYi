import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Durian Routes -------------------------- //

router.get('/:id', authenticate , controllers.getDurianById);
router.get('/guest/:id', controllers.getDurianByGuest);
router.post('/create', authenticate , controllers.createDurian);
router.post('/inspect', authenticate , authorize("ministry") , controllers.inspectDurian);
router.put('/assign', authenticate , authorize("house") , controllers.assignToLot);
router.put('/unassign', authenticate , authorize("house") , controllers.unassignFromLot);

export default router;