import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import asyncHandler from '../middlewares/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/User.js';

export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) throw new ErrorResponse('Email already taken', 403);
  const hashPassword = await bcrypt.hash(password, 5);
  const { _id, name: userName } = await User.create({ name, email, password: hashPassword });
  const token = jwt.sign({ _id, userName }, process.env.JWT_SECRET);
  const cookieOps = {};
  if (process.env.NODE_ENV === 'production') {
    cookieOps.secure = true;
  }
  res.cookie('token', token, cookieOps).json({ success: 'User created' });
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email }).select('+password');
  if (!foundUser) throw new Error('User does not exist');
  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) throw new Error('Password is incorrect');
  const token = jwt.sign({ _id: foundUser._id, userName: foundUser.name }, process.env.JWT_SECRET);
  const cookieOps = {};
  if (process.env.NODE_ENV === 'production') {
    cookieOps.secure = true;
  }
  res.cookie('token', token, cookieOps).json({ success: 'Logged in' });
});

export const getUserInfo = asyncHandler(async (req, res) => {
  res.send(req.user);
});

export const approvedSession = asyncHandler(async (req, res) => {
  res.json({ success: 'Valid token' });
});
