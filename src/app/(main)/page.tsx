import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './LoginForm';
import { validateRequest } from '@/auth';
import { signOut } from '@/action/user';

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-between py-4 lg:border-l-4 border-tu-primary'>
        <div></div>
        {user ? (
          <div className='mx-auto grid w-[350px] gap-8 z-20'>
            <div className='grid gap-2 text-center'>
              <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                أنشطة الأندية الطلابية
              </h1>
              <p className='text-balance text-muted-foreground'>
                خدمات لجنة الأنشطة الطلابية بكلية الحاسبات وتقنية المعلومات
              </p>
            </div>
            <Separator />
            <div className='grid gap-1.5'>
              <Button asChild>
                <Link className='font-bold' href='/register-event'>
                  تسجيل الفعاليات
                </Link>
              </Button>
              {user.role === 'admin' && (
                <>
                  <Button asChild>
                    <Link className='font-bold' href='/events'>
                      الفعاليات المسجلة
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link className='font-bold' href='/report'>
                      إصدار التقارير
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link className='font-bold' href='/user/manage'>
                      إدارة المستخدمين
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link className='font-bold' href='/user/create'>
                      إنشاء مستخدم
                    </Link>
                  </Button>
                </>
              )}
              <Separator />
              <form action={signOut}>
                <Button className='w-full' variant='secondary'>
                  تسجيل خروج
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <LoginForm />
        )}
        <div></div>
      </div>
      <div className='hidden lg:flex relative flex-col justify-center items-center'>
        <div className='z-20 flex flex-col text-3xl items-center text-tu-primary'>
          <Image
            className='py-4'
            src='/assets/logo.png'
            width={170}
            height={170}
            alt='TU logo'
          />
          <div className='text-center space-y-1.5 py-4'>
            <div className='font-medium'>جامعة الطائف</div>
            <div className='font-medium'>كلية الحاسبات وتقنية المعلومات</div>
            <div className='font-medium'>لجنة الأنشطة الطلابية</div>
          </div>
        </div>
        <div
          className='absolute w-full h-full'
          style={{
            backgroundImage: "url('/assets/pattern.png')",
          }}
        ></div>
      </div>
    </main>
  );
}
