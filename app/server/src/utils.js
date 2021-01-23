import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import db from './db';

config();

export async function hashPass(password) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export async function comparePass(userPassword, dbPassword) {
  const valid = await bcrypt.compareSync(userPassword, dbPassword);

  if (!!valid) {
    return true;
  } else {
    throw new Error('invalid credentials');
  }
}

export function createToken(user) {
  if (!user.role) {
    throw new Error('No user role specified');
  }

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      iss: 'api.slack',
      aud: 'api.slack',
    },
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
}

export async function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(401).json({
      status: 'error',
      message: 'you are not authorized',
    });
  }

  const [bearer, token] = req.headers.authorization.split(' ');

  if (bearer === 'Bearer' && token) {
    try {
      const payload = await jwt.verify(token, process.env.TOKEN_SECRET);

      await db('users')
        .where({ id: parseInt(payload.sub) })
        .first();

      next();
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'you are not authorized',
      });
    }
  }
}
