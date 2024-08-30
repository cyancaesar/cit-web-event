import prisma from '../lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
/**
 * Edit these variables to create administrator user
 */
const _USER = '';
const _PASSWD = '';

(async () => {
  const user = {
    username: _USER,
    password: _PASSWD,
  };

  const parseResult = z
    .object({
      username: z
        .string()
        .min(3, { message: 'Username must be greater than 3 characters' })
        .max(64, 'Username must be less than 64 characters'),
      password: z
        .string()
        .min(8, { message: 'Password must be greater than 8 characters' })
        .max(64, { message: 'Password must be less than 64 characters' }),
    })
    .safeParse(user);

  if (parseResult.error) {
    console.error(parseResult.error.format());
    process.exit(1);
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: user.username },
    });
    if (existingUser) {
      console.error(`Username ${user.username} already exist`);
      process.exit(1);
    }
    const createdUser = await prisma.user.create({
      data: {
        username: parseResult.data.username,
        password: bcrypt.hashSync(parseResult.data.password, 10),
        role: 'admin',
      },
    });
    console.log(`Created administrator user: ${createdUser.username}`);
  } catch (e) {
    console.error('Error while running create-users.ts');
  }
})();
