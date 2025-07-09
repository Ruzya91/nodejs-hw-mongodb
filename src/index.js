import express from 'express';
import cors from 'cors';
import {
  handleGetContactById,
  handleGetAllContacts,
} from './controllers/contactsController.js';

const app = express();
console.log('23');
app.use(cors());
app.use(express.json());

// === Routes ===
app.get('/contacts/:contactId', handleGetContactById);
app.get('/contacts', handleGetAllContacts);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

export default app;
