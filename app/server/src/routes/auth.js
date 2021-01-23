import express from 'express';
import bcrypt from 'bcryptjs';
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

router.post('/auth/register', async (req, res) => {
  try {
    const username = await db('users')
      .where({ username: req.body.username })
      .first();

    if (username) {
      throw new Error('username taken');
    }

    const email = await db('users').where({ email: req.body.email }).first();

    if (email) {
      throw new Error('email taken');
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    const [user] = await db('users')
      .insert({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })
      .returning(['id', 'username', 'email', 'created_at', 'updated_at']);

    const token = await createToken(user);

    res.status(200).send({
      status: 'success',
      token,
      user,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

export default router;
