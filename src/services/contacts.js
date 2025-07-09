import { Contact } from '../models/contactModel.js';

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const getAllContacts = async () => {
  return await Contact.find();
};
