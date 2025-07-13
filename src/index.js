import express from 'express';
import cors from 'cors';
// import {
//   handleGetContactById,
//   handleGetAllContacts,
// } from './controllers/contactsController.js';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
console.log('23');
app.use(cors());
app.use(express.json());

// // === Routes ===
// app.get('/contacts/:contactId', handleGetContactById);
// app.get('/contacts', handleGetAllContacts);

// 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' });
// });
app.use('/contacts', contactsRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
