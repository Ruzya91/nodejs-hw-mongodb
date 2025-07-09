import { getContactById, getAllContacts } from '../services/contacts.js';

export const handleGetContactById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const handleGetAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully fetched all contacts',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
