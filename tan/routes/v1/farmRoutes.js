import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Farm Routes -------------------------- //

router.post('/create', controllers.createFarm);

export default router;