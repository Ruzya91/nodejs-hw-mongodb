import createError from 'http-errors';
import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { refreshSession } from '../services/auth.js';
import { logoutSession } from '../services/auth.js';

export const handleRegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser({ name, email, password });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};

export const handleLoginUser = async (req, res) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await loginUser(email, password);

  res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      status: 200,
      message: 'Successfully logged in an user!',
      data: { accessToken },
    });
};

export const handleRefreshSession = async (req, res) => {
  const { refreshToken } = req.cookies;

  const newAccessToken = await refreshSession(refreshToken);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: newAccessToken },
  });
};
export const handleLogoutUser = async (req, res) => {
  const { refreshToken } = req.cookies;

  await logoutSession(refreshToken);

  res.clearCookie('refreshToken');

  res.sendStatus(204);
};
