import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      throw createError(400, '"token" and "password" are required');
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return next(createError(401, 'Token is expired or invalid.'));
    }

    const { email } = payload;

    const user = await UsersCollection.findOne({ email });
    if (!user) {
      throw createError(404, 'User not found!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.refreshToken = null;
    await user.save();

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
