import express from 'express';
import upload from '../middlewares/upload.js';
import {
  handleGetContactById,
  handleGetAllContacts,
  handleCreateContact,
  handlePatchContact,
  handleDeleteContact,
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validators/contactsSchemas.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = express.Router();
router.use(authenticate);

router.get('/', ctrlWrapper(handleGetAllContacts));
router.get('/:contactId', isValidId, ctrlWrapper(handleGetContactById));

// ✅ Обновлённые маршруты с загрузкой фото
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(handleCreateContact),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(handlePatchContact),
);

router.delete('/:contactId', isValidId, ctrlWrapper(handleDeleteContact));

export default router;
