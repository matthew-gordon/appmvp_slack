import express from 'express';
import db from '../db';
import { comparePass, createToken } from '../utils';

const router = express.Router();

router.post('/auth/login', async (req, res) => {
  try {
    const user = await db('users').where({ email: req.body.email }).first();

    if (!user) {
      throw new Error('invalid credentials');
    }

    await comparePass(req.body.password, user.password);

    const token = await createToken(user);

    res.status(200).send({ status: 'success', user, token });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

export default router;
