import { Contact } from '../models/contactModel.js';

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const getAllContacts = async () => {
  return await Contact.find();
};
export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContactById = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteContactById = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
