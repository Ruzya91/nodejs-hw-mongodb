import { Contact } from '../models/contactModel.js';

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};
