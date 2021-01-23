import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

export async function comparePass(userPassword, dbPassword) {
  const valid = await bcrypt.compareSync(userPassword, dbPassword);

  if (!!valid) {
    return true;
  } else {
    throw new Error('invalid credentials');
  }
}

export async function createToken(user) {
  const tokenSecret = process.env.TOKEN_SECRET || 'changeme';

  return {
    token: jwt.sign(
      {
        exp: dayjs().add(15, 'day').unix(),
        iat: dayjs().unix(),
        sub: user.id,
      },
      tokenSecret,
      {}
    ),
  };
}
