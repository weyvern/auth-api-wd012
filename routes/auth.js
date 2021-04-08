import express from 'express';
import { signUp } from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/', signUp);

export default authRouter;
