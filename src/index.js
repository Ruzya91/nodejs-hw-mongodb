import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

const app = express();
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);
app.use(notFoundHandler);
app.use(errorHandler);
app.use('/auth', authRouter);
app.use(cookieParser());
export default app;
