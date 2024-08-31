'use server';
import { cookies } from 'next/headers';
import { lucia, validateRequest } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';
import {
  changePasswordSchema,
  createUserSchema,
} from '@/lib/schema/UserSchema';
import { revalidatePath } from 'next/cache';

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

  if (!existingUser)
    return {
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    };

  const validPassword = await bcrypt.compare(password, existingUser.password);

  if (!validPassword)
    return {
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
    };

  if (existingUser.isDisabled)
    return {
      error: `المستخدم ${existingUser.username} معطل`,
    };

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
  if (existingUser) return { error: 'إسم المستخدم غير متاح' };

  const createdUser = await prisma.user.create({
    data: { username, password: passwordHash, role: 'user' },
  });

  return { message: `تم إنشاء المستخدم ${createdUser.username}` };
}

export async function disableUser(id: string) {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin')
    return {
      error: 'غير موثق',
    };

  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser)
    return {
      error: 'المستخدم غير موجود',
    };

  if (!existingUser.isDisabled) {
    // Disable user
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isDisabled: true,
        disabledAt: new Date(),
      },
    });
    // Delete all sessions associated with the user
    await prisma.session.deleteMany({
      where: { userId: existingUser.id },
    });
    revalidatePath('/user/manage');
    return { message: `تم تعطيل المستخدم ${existingUser.username}` };
  }

  return { error: `المستخدم معطل` };
}

export async function enableUser(id: string) {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin')
    return {
      error: 'غير موثق',
    };

  const existingUser = await prisma.user.findUnique({ where: { id } });

  if (!existingUser)
    return {
      error: 'المستخدم غير موجود',
    };

  if (existingUser.isDisabled) {
    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isDisabled: false,
      },
    });
    revalidatePath('/user/manage');
    return { message: `تم تفعيل المستخدم ${existingUser.username}` };
  }

  return { error: `المستخدم مفعل` };
}

export async function changePassword(id: string, data: any) {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin')
    return {
      error: 'غير موثق',
    };

  const parsed = changePasswordSchema.safeParse(data);

  if (parsed.error) {
    if (parsed.error.issues.length > 0) {
      return { error: parsed.error.issues.at(0)?.message };
    }
    return { error: 'خطأ في التحقق من البيانات' };
  }

  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser)
    return {
      error: 'المستخدم غير موجود',
    };

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  // Update user password
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: passwordHash },
  });
  // Delete all sessions associated with the user
  await prisma.session.deleteMany({
    where: { userId: existingUser.id },
  });

  return { message: `تم تغيير كلمة مرور المستخدم ${existingUser.username}` };
}
