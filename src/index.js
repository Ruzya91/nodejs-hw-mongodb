import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import apiDocsRouter from './routers/api-docs.js';

const app = express();

app.use('/api-docs', apiDocsRouter);
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
