import jwt from 'jsonwebtoken';
import db from '../db';

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const check = token.split(' ')[1];
    const data = jwt.verify(check, 'changeme');
    const { password, ...rest } = await db('users')
      .where({ id: data.sub })
      .first();

    res.locals.user = rest;

    return next();
  }

  return next();
};
