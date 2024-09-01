import Sidebar from '@/components/Sidebar';
import PasswordResetForm from './PasswordResetForm';
import Link from 'next/link';

export default function PasswordReset() {
  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
        <div></div>
        <>
          <div className='space-y-8'>
            <div className='gap-2 text-center hidden'>
              <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                منصة الفعاليات والأنشطة الطلابية
              </h1>
              <p className='text-balance text-muted-foreground'>
                صفحة تسجيل الدخول للمسجلين بالنظام
              </p>
            </div>
            <PasswordResetForm />
          </div>
        </>
        <div></div>
      </div>
      <Sidebar />
    </main>
  );
}
