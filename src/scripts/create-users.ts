import prisma from '../lib/db';
import bcrypt from 'bcrypt';

(async () => {
  const users = [
    {
      username: '',
      password: bcrypt.hashSync('', 10),
    },
  ];

  try {
    const result = await prisma.user.createMany({ data: users });
    console.log(`CREATED ${result.count} users`);
  } catch (e) {
    console.error('Error while running create-users.ts');
  }
})();
