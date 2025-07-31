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
import { sendResetEmail } from '../controllers/sendResetEmail.js';
import { resetPassword } from '../controllers/resetPassword.js';
import { resetPasswordSchema } from '../schemas/authSchemas.js';

const router = express.Router();
router.post('/login', validateBody(loginUserSchema), handleLoginUser);
router.post('/register', validateBody(registerSchema), handleRegisterUser);

router.post('/refresh', handleRefreshSession);
router.post('/logout', handleLogoutUser);

router.post('/send-reset-email', sendResetEmail);

router.post('/reset-pwd', validateBody(resetPasswordSchema), resetPassword);

export default router;
