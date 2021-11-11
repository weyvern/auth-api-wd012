import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization }
    } = req;
    if (!authorization) throw new Error('Unauthorized');
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET);
    const foundUser = await User.findOne({ _id });
    if (!foundUser) throw new Error('User does not exist');
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyToken;
