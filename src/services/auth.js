import createError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Реєстрація
export const registerUser = async ({ name, email, password }) => {
  const existingUser = await UsersCollection.findOne({ email });
  if (existingUser) {
    throw createError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UsersCollection.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

// Логін
export const loginUser = async (email, password) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError(401, 'Invalid email or password');
  }

  // Генерація токенів
  const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: '30d',
  });

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  );

  // Видалити стару сесію
  await Session.findOneAndDelete({ userId: user._id });

  // Створити нову сесію
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return { accessToken, refreshToken };
};

// Оновлення токена
export const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(401, 'Refresh token not found');
  }

  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createError(401, 'Invalid refresh token');
  }

  try {
    const payload = jwt.verify(refreshToken, JWT_SECRET);
    const userId = payload.userId;

    const newAccessToken = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '15m',
    });

    const newRefreshToken = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: '30d',
    });

    const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
    const refreshTokenValidUntil = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    );

    await Session.findOneAndDelete({ userId });

    await Session.create({
      userId,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenValidUntil,
      refreshTokenValidUntil,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw createError(401, 'Refresh token expired or invalid');
  }
};

// Логаут
export const logoutSession = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(400, 'Missing refresh token');
  }

  const session = await Session.findOne({ refreshToken });
  if (!session) {
    throw createError(401, 'Invalid session');
  }

  await Session.deleteOne({ _id: session._id });
};
