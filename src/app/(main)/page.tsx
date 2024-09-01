import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import LoginForm from './LoginForm';
import { validateRequest } from '@/auth';
import { signOut } from '@/action/user';
import Sidebar from '@/components/Sidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailPlus } from 'lucide-react';

export default async function Home() {
  const { user } = await validateRequest();

  const AddEmail = () => {
    return (
      <Alert className='flex gap-2 shadow-sm'>
        <div className='mt-0.5'>
          <MailPlus className='w-4 h-4' />
        </div>
        <div>
          <AlertTitle>أضف بريدك الإلكتروني</AlertTitle>
          <AlertDescription>
            أربط بريدك الإلكتروني بالحساب حتى تتمكن من إسترجاعه في حال فقدان
            كلمة المرور
          </AlertDescription>
        </div>
        <Button asChild className='mx-auto' variant='outline'>
          <Link href='/account'>إضافة</Link>
        </Button>
      </Alert>
    );
  };

  const VerifyEmail = () => {
    return (
      <Alert className='flex gap-2 shadow-sm'>
        <div className='mt-0.5'>
          <MailPlus className='w-4 h-4' />
        </div>
        <div>
          <AlertTitle>تحقق من بريدك الإلكتروني</AlertTitle>
          <AlertDescription>
            البريد الإلكتروني المربوط بهذا الحساب غير موثق
          </AlertDescription>
        </div>
      </Alert>
    );
  };

  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-around rtl:lg:border-l-4 ltr:lg:border-r-4 border-tu-primary'>
        <div className='w-2/3'>
          {user &&
            (!user.email ? (
              <AddEmail />
            ) : user.email && !user.emailVerifiedAt ? (
              <VerifyEmail />
            ) : (
              <></>
            ))}
        </div>
        {user ? (
          <div className='mx-auto grid w-[350px] gap-8 z-20'>
            <div className='grid gap-2 text-center'>
              <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                أنشطة الأندية الطلابية
              </h1>
              <p className='text-balance text-muted-foreground'>
                خدمات وحدة الأنشطة الطلابية بكلية الحاسبات وتقنية المعلومات
              </p>
            </div>
            <Separator />
            <div className='grid gap-1.5'>
              <Button asChild>
                <Link className='font-bold' href='/register-event'>
                  تسجيل الفعاليات
                </Link>
              </Button>
              <Button asChild>
                <Link className='font-bold' href='/account'>
                  بيانات الحساب
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
                    <Link className='font-bold' href='/gallery'>
                      معرض الصور
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
          <>
            <div className='space-y-8'>
              <div className='grid gap-2 text-center'>
                <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                  منصة الفعاليات والأنشطة الطلابية
                </h1>
                <p className='text-balance text-muted-foreground'>
                  تسجيل الدخول للمسجلين بالنظام
                </p>
              </div>
              <LoginForm />
            </div>
          </>
        )}
        <div></div>
      </div>
      <Sidebar />
    </main>
  );
}
