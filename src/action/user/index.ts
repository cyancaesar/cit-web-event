'use server';
import { cookies } from 'next/headers';
import { lucia, validateRequest } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import { createUserSchema } from '@/lib/schema/UserSchema';

interface ActionResult {
  error?: string;
  message?: string;
}

export async function signIn(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser) {
    return {
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    };
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword) {
    return {
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    };
  }

  // Log user sign in
  await prisma.log.create({
    data: { user: { connect: { id: existingUser.id } } },
  });

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/');
}

export async function signOut(): Promise<ActionResult> {
  const { session } = await validateRequest();
  if (!session)
    return {
      error: 'غير موثق',
    };

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/');
}

export async function createUser(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin')
    return {
      error: 'غير موثق',
    };

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const data = createUserSchema.safeParse({
    username,
    password,
    confirmPassword,
  });

  if (data.error) {
    if (data.error.issues.length > 0) {
      return { error: data.error.issues.at(0)?.message };
    }
    return { error: 'خطأ في التحقق من البيانات' };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return { error: 'إسم المستخدم غير متاح' };
  }

  const createdUser = await prisma.user.create({
    data: { username, password: passwordHash, role: 'user' },
  });

  return { message: `تم إنشاء المستخدم ${createdUser.username}` };
}
