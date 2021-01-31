import express from 'express';
import jwt from 'jsonwebtoken';
import { comparePass, hashPass, createToken } from '../utils';
import db from '../db';

const router = express.Router();

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(403).json({
        status: 'error',
        message: 'invalid credentials',
      });
    }

    const passwordValid = await comparePass(password, user.password);

    if (passwordValid) {
      const { password, bio, ...rest } = user;
      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(user);

      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp;

      res.json({
        status: 'success',
        message: 'User logged in!',
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(403).json({
        status: 'error',
        message: 'invalid credentials',
      });
    }
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

router.post('/auth/register', async (req, res) => {
  try {
    const { email, username } = req.body;

    const hashedPassword = hashPass(req.body.password);

    const userData = {
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
      role: 'user',
    };

    const usernameExists = await db('users')
      .where({ username: userData.username })
      .first();

    if (usernameExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'username already exists' });
    }

    const emailExists = await db('users')
      .where({ email: userData.email })
      .first();

    if (emailExists) {
      return res
        .status(400)
        .json({ status: 'error', message: 'email already exists' });
    }

    const [user] = await db('users')
      .insert({
        username,
        email,
        password: hashedPassword,
      })
      .returning('*');

    if (user) {
      const token = createToken(user);
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp;

      const { id, email, username, role } = user;

      const userInfo = {
        id,
        email,
        username,
        role,
      };

      res.cookie('token', token);

      res.json({
        status: 'success',
        message: 'User created!',
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'there was a problem creating your account',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'there was a problem creating your account',
    });
  }
});

export default router;
