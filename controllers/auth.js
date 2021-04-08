import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const foundUser = await User.find({ email });
    if (foundUser.length > 0) throw new Error('Email already taken');
    const hashPassword = await bcrypt.hash(password, 5);
    const { _id, name: userName } = await User.create({ name, email, password: hashPassword, address });
    const token = jwt.sign({ _id, userName }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
