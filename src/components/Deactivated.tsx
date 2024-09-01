import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import Sidebar from './Sidebar';

export default function Deactivated() {
  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
        <div></div>
        <>
          <div className='space-y-8'>
            <div className='text-center'>
              <div className='space-y-4'>
                <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                  الحساب معطل
                </h1>
                <p className='text-muted-foreground'>
                  لتفعيله إتصل بأحد مدراء المنصة أو إرسال بريد الى مدير النظام{' '}
                  <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
                    <a href={`mailto:${process.env.SMTP_AUTH_USER!}`}>
                      {process.env.SMTP_AUTH_USER!}
                    </a>
                  </code>
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
}
