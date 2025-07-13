import express from 'express';
import cors from 'cors';

import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);
app.use(notFoundHandler);
app.use(errorHandler);
export default app;
