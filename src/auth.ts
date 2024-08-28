import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from './lib/db';
import bcrypt from 'bcrypt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  jwt: { maxAge: 7 * 24 * 60 * 60 /* 7 days */ },
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        const username = credentials!.username! as string;
        const password = credentials!.password! as string;

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(password, user?.password!);
        if (isValid) {
          return { id: user.id, name: user.username, email: 'non@non.non' };
        } else return null;
      },
    }),
  ],
});
