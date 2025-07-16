import { Contact } from '../models/contactModel.js';

export const getContactById = async (id) => {
  return await Contact.findById(id);
};

export const getAllContacts = async (
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  filters = {},
) => {
  const skip = (page - 1) * perPage;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;

  const query = {};

  if (filters.type) {
    query.contactType = filters.type;
  }

  if (typeof filters.isFavourite !== 'undefined') {
    query.isFavourite = filters.isFavourite === 'true'; // convert string to boolean
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
