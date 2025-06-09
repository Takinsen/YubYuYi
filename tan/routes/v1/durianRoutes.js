import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- Durian Routes -------------------------- //

router.get('/search', controllers.searchDurian);

export default router;