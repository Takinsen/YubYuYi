import { Router } from 'express';
import { authenticate , authorize } from '../../middlewares/auth.js';
import * as controllers from "../../controllers/v1/index.js";

const router = Router();

// -------------------------- authentication Routes -------------------------- //

router.get('/me', authenticate , controllers.getMe);
router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);

export default router;