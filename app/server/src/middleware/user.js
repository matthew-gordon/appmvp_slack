import jwt from 'jsonwebtoken';
import db from '../db';

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const check = token.split(' ')[1];

      const data = jwt.verify(check, 'changeme');

      const { password, ...user } = await db('users')
        .where({ id: data.sub })
        .first();

      res.locals.user = user;

      return next();
    } catch (err) {
      return next();
    }
  }

  return next();
};
