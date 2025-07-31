import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../services/sendEmail.js';
import { UsersCollection } from '../db/models/user.js';

const JWT_SECRET = process.env.JWT_SECRET;
const APP_DOMAIN = process.env.APP_DOMAIN;

export const sendResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createError(400, '"email" is required');
    }

    const user = await UsersCollection.findOne({ email });
    if (!user) {
      throw createError(404, 'User not found!');
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' });

    const resetLink = `${APP_DOMAIN}/reset-password?token=${token}`;

    const html = `
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `;

    try {
      await sendEmail(email, 'Reset your password', html);
    } catch (error) {
      console.error('Send email error:', error);
      throw createError(
        500,
        'Failed to send the email, please try again later.',
      );
    }

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
