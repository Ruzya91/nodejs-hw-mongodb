import express from 'express';
import {
  handleRegisterUser,
  handleLoginUser,
  handleRefreshSession,
  handleLogoutUser,
} from '../controllers/auth.js';
import validateBody from '../middlewares/validateBody.js';
import { registerSchema } from '../schemas/authSchemas.js';
import { loginUserSchema } from '../schemas/userValidationSchemas.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), handleRegisterUser);
router.post('/login', validateBody(loginUserSchema), handleLoginUser);
router.post('/refresh', handleRefreshSession);
router.post('/logout', handleLogoutUser);
export default router;
