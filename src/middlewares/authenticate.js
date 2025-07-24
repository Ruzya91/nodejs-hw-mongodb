import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

const ACCESS_SECRET = process.env.ACCESS_SECRET;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';

    if (!authHeader.startsWith('Bearer ')) {
      throw createError(401, 'Authorization header missing or malformed');
    }

    const token = authHeader.split(' ')[1];

    let payload;

    try {
      payload = jwt.verify(token, ACCESS_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw createError(401, 'Access token expired');
      }
      throw createError(401, 'Invalid access token');
    }

    const user = await UsersCollection.findById(payload.userId);

    if (!user) {
      throw createError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authenticate;
