import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new Error('Email already taken');
    const hashPassword = await bcrypt.hash(password, 5);
    const { _id, name: userName } = await User.create({ name, email, password: hashPassword, address });
    const token = jwt.sign({ _id, userName }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) throw new Error('User does not exist');
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) throw new Error('Password is incorrect');
    const token = jwt.sign({ _id: foundUser._id, userName: foundUser.name }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
