import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Durian Routes -------------------------- //

router.get('/:id', authenticate , controllers.getDurianById);
router.get('/guest/:id', controllers.getDurianByGuest);
router.post('/create', authenticate , controllers.createDurian);

export default router;