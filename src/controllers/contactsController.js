import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';

// GET /contacts
export const handleGetAllContacts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const sortBy = req.query.sortBy || 'name';
  const sortOrder = req.query.sortOrder || 'asc';
  const type = req.query.type;
  const isFavourite = req.query.isFavourite;

  const filters = {
    ...(type && { type }),
    ...(typeof isFavourite !== 'undefined' && { isFavourite }),
  };

  const { contacts, totalItems } = await getAllContacts(
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  );

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched filtered contacts!',
    data: {
      contacts,
      page,
      perPage,
      totalItems,
      totalPages,
      sortBy,
      sortOrder,
      filters,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
};

// GET /contacts/:contactId
export const handleGetContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// POST /contacts
export const handleCreateContact = async (req, res) => {
  const newContact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

// PATCH /contacts/:contactId
export const handlePatchContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactById(contactId, req.body);

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const handleDeleteContact = async (req, res) => {
  const { contactId } = req.params;

  const deletedContact = await deleteContactById(contactId);

  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
