import User from '../models/User.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const newUser = await User.create({ name, email, password, address });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
