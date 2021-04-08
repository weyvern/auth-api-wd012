import express from 'express';
import { signUp, signIn } from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);

export default authRouter;
