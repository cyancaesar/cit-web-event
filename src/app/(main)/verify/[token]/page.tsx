import Deactivated from '@/components/Deactivated';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import Unauthorized from '@/components/Unauthorized';
import prisma from '@/lib/db';
import { format, isAfter } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { z } from 'zod';

type Props = {
  params: {
    token: string;
  };
};
export default async function VerifyEmail({ params }: Props) {
  const parsed = z.string().min(4).max(64).safeParse(params.token);
  if (parsed.error) return <Unauthorized />;

  const existingToken = await prisma.emailVerification.findUnique({
    where: { token: parsed.data },
    include: { user: true },
  });

  if (!existingToken)
    return (
      <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
        <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
          <div></div>
          <>
            <div className='space-y-8'>
              <div className='gap-2 text-center'>
                <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                  رابط التحقق من البريد غير صالح
                </h1>
                <Button variant='outline' className='mt-8' asChild>
                  <Link href='/'>الرجوع للصفحة الرئيسية</Link>
                </Button>
              </div>
            </div>
          </>
          <div></div>
        </div>
        <Sidebar />
      </main>
    );

  if (existingToken.user.isDisabled) return <Deactivated />;

  if (existingToken.completedAt)
    return (
      <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
        <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
          <div></div>
          <>
            <div className='space-y-8'>
              <div className='text-center'>
                <div className='space-y-4'>
                  <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                    تم التحقق من البريد مسبقًا
                  </h1>
                  <p className='tracking-tighter text-muted-foreground'>
                    <span>تم التحقق في </span>
                    <span dir='ltr'>
                      {format(existingToken.completedAt, 'yyyy/MM/dd HH:mm')}
                    </span>
                  </p>
                </div>
                <Button variant='outline' className='mt-8' asChild>
                  <Link href='/'>الرجوع للصفحة الرئيسية</Link>
                </Button>
              </div>
            </div>
          </>
          <div></div>
        </div>
        <Sidebar />
      </main>
    );

  if (isAfter(new Date(), existingToken.expiresAt))
    return (
      <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
        <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
          <div></div>
          <>
            <div className='space-y-8'>
              <div className='text-center'>
                <div className='space-y-4'>
                  <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                    إنتهت صلاحية رابط التحقق من البريد
                  </h1>

                  <p className='tracking-tighter text-muted-foreground'>
                    <span>تاريخ الإنتهاء </span>
                    <span dir='ltr'>
                      {format(existingToken.expiresAt, 'yyyy/MM/dd HH:mm')}
                    </span>
                  </p>
                </div>
                <Button variant='outline' className='mt-8' asChild>
                  <Link href='/'>الرجوع للصفحة الرئيسية</Link>
                </Button>
              </div>
            </div>
          </>
          <div></div>
        </div>
        <Sidebar />
      </main>
    );

  // Verify email
  await prisma.emailVerification.update({
    where: { id: existingToken.id },
    data: {
      completedAt: new Date(),
      user: { update: { emailVerifiedAt: new Date() } },
    },
  });

  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
        <div></div>
        <>
          <div className='space-y-8'>
            <div className='gap-2 text-center'>
              <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                تم التحقق من بريد المستخدم {existingToken.user.username}
              </h1>
              <p className='tracking-tighter text-muted-foreground'>
                <span>البريد {existingToken.user.email}</span>
              </p>
              <Button variant='outline' className='mt-8' asChild>
                <Link href='/'>الرجوع للصفحة الرئيسية</Link>
              </Button>
            </div>
          </div>
        </>
        <div></div>
      </div>
      <Sidebar />
    </main>
  );
}
