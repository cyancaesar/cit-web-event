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
import { z } from 'zod';
import { generateIdFromEntropySize } from 'lucia';
import { addHours, isAfter } from 'date-fns';
import Mailer from '@/lib/mailer';

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

  if (existingUser.role === 'admin')
    return {
      error: 'لا يمكن تعطيل مستخدم مدير',
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

export async function resetPasswordRequest(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get('email') as string;
  const parsed = z.string().safeParse(email);

  if (parsed.error)
    return {
      error: 'يجب إدخال بريد إلكتروني صحيح',
    };

  // Change username to email
  const existingUser = await prisma.user.findFirst({
    where: { email: parsed.data },
  });

  if (!existingUser || !existingUser.email)
    return {
      error: 'لا يوجد حساب مربوط بالبريد المدخل',
    };

  const token = generateIdFromEntropySize(10);
  const expiresAt = addHours(new Date(), 1);

  await prisma.passwordReset.deleteMany({ where: { userId: existingUser.id } });

  const passwordReset = await prisma.passwordReset.create({
    data: {
      token,
      expiresAt,
      user: { connect: { id: existingUser.id } },
    },
  });

  const domain = process.env.BASE_URL!;
  const smtpName = process.env.SMTP_NAME!;
  const smtpUser = process.env.SMTP_AUTH_USER!;
  const html = `
  <h3 dir="rtl">طلب تغيير كلمة مرور للمستخدم ${existingUser.username}</h3>
  <p dir="rtl">لتغيير كلمة المرور، يرجى الضغط على الرابط: <a href="${domain}/password-reset/${passwordReset.token}">${domain}/password-reset/${passwordReset.token}</a></p>
  `;

  const info = await Mailer.sendMail({
    from: `"${smtpName}" <${smtpUser}>`,
    to: existingUser.email,
    subject: `طلب تغيير كلمة مرور ${domain}`,
    text: `تغيير كلمة المرور ${domain}/verify/${passwordReset.token}`,
    html,
  });

  return {
    message: 'تم إرسال رابط تغيير كلمة المرور',
  };
}

export async function resetPassword(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');
  const token = formData.get('token');

  const parsedToken = z.string().min(4).max(64).safeParse(token);
  if (parsedToken.error)
    return {
      error: 'لا يوجد رابط تغيير كلمة مرور',
    };

  const existingToken = await prisma.passwordReset.findFirst({
    where: { token: parsedToken.data },
  });

  if (!existingToken)
    return {
      error: 'لا يوجد رابط تغيير كلمة مرور',
    };

  if (existingToken.completedAt)
    return { error: 'تم إستهلاك رابط تغيير كلمة المرور' };

  if (isAfter(new Date(), existingToken.expiresAt))
    return { error: 'إنتهت صلاحية رابط تغيير المرور' };

  const parsed = changePasswordSchema.safeParse({ password, confirmPassword });

  if (parsed.error) {
    if (parsed.error.issues.length > 0) {
      return { error: parsed.error.issues.at(0)?.message };
    }
    return { error: 'خطأ في التحقق من البيانات' };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  // Change the user password
  // and update completedAt field
  await prisma.user.update({
    where: { id: existingToken.userId },
    data: {
      password: passwordHash,
      passwordReset: {
        update: {
          where: { id: existingToken.id },
          data: { completedAt: new Date() },
        },
      },
    },
  });
  // Delete all sessions associated with the user
  await prisma.session.deleteMany({
    where: { userId: existingToken.userId },
  });

  return { message: 'تم تغيير كلمة المرور، يمكنك العودة لصفحة تسجيل الدخول' };
}

/**
 * Add user email
 * Only used once when the user is FRESH and doesn't have email assigned to their account
 */
export async function addEmail(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const { user } = await validateRequest();
  if (!user) return { error: 'غير موثق' };

  const email = formData.get('email');

  const parsed = z.string().email().safeParse(email);
  if (parsed.error) return { error: 'يجب إدخال بريد إلكتروني صحيح' };

  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!existingUser)
    return {
      error: 'المستخدم ليس مسجل بالنظام',
    };

  const usedEmail = await prisma.user.findFirst({
    where: { email: parsed.data },
  });
  if (usedEmail) return { error: 'البريد المدخل غير متاح' };

  if (existingUser.email && existingUser.emailVerifiedAt)
    return {
      error: 'يوجد بريد مربوط بالحساب.',
    };

  // Add email
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { email: parsed.data },
  });

  // Generate token
  const token = generateIdFromEntropySize(10);
  const expiresAt = addHours(new Date(), 1);

  await prisma.emailVerification.deleteMany({
    where: { userId: existingUser.id },
  });

  const emailVerification = await prisma.emailVerification.create({
    data: {
      token,
      expiresAt,
      user: { connect: { id: existingUser.id } },
    },
  });

  // Sending email verification link
  const domain = process.env.BASE_URL!;
  const smtpName = process.env.SMTP_NAME!;
  const smtpUser = process.env.SMTP_AUTH_USER!;

  const html = `
  <h3 dir="rtl">تحقق من البريد الإلكتروني للمستخدم ${existingUser.username}</h3>
  <p dir="rtl">لإكمال عملية التحقق يرجى الضغط على الرابط: <a href="${domain}/verify/${emailVerification.token}">${domain}/verify/${emailVerification.token}</a></p>
  `;

  const info = await Mailer.sendMail({
    from: `"${smtpName}" <${smtpUser}>`,
    to: parsed.data,
    subject: `تحقق من بريدك ${domain}`,
    text: `إكمال عملية التحقق من البريد ${domain}/verify/${emailVerification.token}`,
    html,
  });

  return {
    message: 'تم إرسال رابط تحقق من البريد',
  };
}

/**
 * Change user email
 */
export async function changeEmail(
  _: any,
  formData: FormData
): Promise<ActionResult> {
  const { user } = await validateRequest();
  if (!user) return { error: 'غير موثق' };

  const email = formData.get('changeEmail');

  const parsed = z.string().email().safeParse(email);
  if (parsed.error) return { error: 'يجب إدخال بريد إلكتروني صحيح' };

  const existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  if (!existingUser)
    return {
      error: 'المستخدم ليس مسجل بالنظام',
    };

  const usedEmail = await prisma.user.findFirst({
    where: { email: parsed.data },
  });

  if (usedEmail) {
    if (usedEmail.id !== existingUser.id)
      return { error: 'البريد المدخل غير متاح' };
  }

  if (existingUser.email === parsed.data) {
    if (existingUser.emailVerifiedAt)
      return {
        error: `البريد ${parsed.data} موثق بالحساب`,
      };
    else {
      // SAME CODE AS BELOW
      // Generate token
      const token = generateIdFromEntropySize(10);
      const expiresAt = addHours(new Date(), 1);

      await prisma.emailVerification.deleteMany({
        where: { userId: existingUser.id },
      });

      const emailVerification = await prisma.emailVerification.create({
        data: {
          token,
          expiresAt,
          user: { connect: { id: existingUser.id } },
        },
      });

      // Sending email verification link
      const domain = process.env.BASE_URL!;
      const smtpName = process.env.SMTP_NAME!;
      const smtpUser = process.env.SMTP_AUTH_USER!;

      const html = `
  <h3 dir="rtl">تحقق من البريد الإلكتروني للمستخدم ${existingUser.username}</h3>
  <p dir="rtl">لإكمال عملية التحقق يرجى الضغط على الرابط: <a href="${domain}/verify/${emailVerification.token}">${domain}/verify/${emailVerification.token}</a></p>
  `;

      const info = await Mailer.sendMail({
        from: `"${smtpName}" <${smtpUser}>`,
        to: parsed.data,
        subject: `تحقق من تغيير البريد ${domain}`,
        text: `إكمال عملية التحقق من البريد ${domain}/verify/${emailVerification.token}`,
        html,
      });

      return {
        message: 'تم إرسال رابط تحقق من البريد مرة اخرى',
      };
    }
  }

  // Add email
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { email: parsed.data },
  });

  // Generate token
  const token = generateIdFromEntropySize(10);
  const expiresAt = addHours(new Date(), 1);

  await prisma.emailVerification.deleteMany({
    where: { userId: existingUser.id },
  });

  const emailVerification = await prisma.emailVerification.create({
    data: {
      token,
      expiresAt,
      user: { connect: { id: existingUser.id } },
    },
  });

  // Sending email verification link
  const domain = process.env.BASE_URL!;
  const smtpName = process.env.SMTP_NAME!;
  const smtpUser = process.env.SMTP_AUTH_USER!;

  const html = `
  <h3 dir="rtl">تحقق من البريد الإلكتروني للمستخدم ${existingUser.username}</h3>
  <p dir="rtl">لإكمال عملية التحقق يرجى الضغط على الرابط: <a href="${domain}/verify/${emailVerification.token}">${domain}/verify/${emailVerification.token}</a></p>
  `;

  const info = await Mailer.sendMail({
    from: `"${smtpName}" <${smtpUser}>`,
    to: parsed.data,
    subject: `تحقق من تغيير البريد ${domain}`,
    text: `إكمال عملية التحقق من البريد ${domain}/verify/${emailVerification.token}`,
    html,
  });

  return {
    message: 'تم إرسال رابط تحقق من البريد',
  };
}
