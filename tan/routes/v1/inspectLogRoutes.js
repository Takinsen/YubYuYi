import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- House Routes -------------------------- //

router.get('/mine', authenticate , authorize("ministry") , controllers.getInspectLogs);

export default router;