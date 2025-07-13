import express from 'express';
import {
  handleGetContactById,
  handleGetAllContacts,
  handleCreateContact,
  handlePatchContact,
  handleDeleteContact,
} from '../controllers/contactsController.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const router = express.Router();
router.get('/', ctrlWrapper(handleGetAllContacts));
// router.get('/', handleGetAllContacts);
router.get('/:contactId', handleGetContactById);
router.post('/', ctrlWrapper(handleCreateContact));
router.patch('/:contactId', ctrlWrapper(handlePatchContact));
router.delete('/:contactId', ctrlWrapper(handleDeleteContact));

export default router;
