import { Contact } from '../models/contactModel.js';

// GET ALL CONTACTS (лише користувача)
export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filters = {},
  userId,
) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const query = { userId }; // фільтр по користувачу

  if (filters.type) {
    query.contactType = filters.type;
  }

  if (typeof filters.isFavourite !== 'undefined') {
    query.isFavourite = filters.isFavourite === 'true';
  }

  const [contacts, totalItems] = await Promise.all([
    Contact.find(query)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortDirection }),
    Contact.countDocuments(query),
  ]);

  return { contacts, totalItems };
};

// GET BY ID (лише свій контакт)
export const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, userId });
};

// CREATE CONTACT (userId вже додається у контролері)
export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

// UPDATE BY ID (лише свій контакт)
export const updateContactById = async (id, data, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true,
  });
};

// DELETE BY ID (лише свій контакт)
export const deleteContactById = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, userId });
};
