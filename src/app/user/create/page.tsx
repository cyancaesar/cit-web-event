import Image from 'next/image';
import { validateRequest } from '@/auth';
import CreateUserForm from './CreateUserForm';
import Unauthorized from '@/components/Unauthorized';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function CreateUser() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;

  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-between py-12 lg:border-l-4 border-tu-primary px-8'>
        <Breadcrumb className='self-start'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='rtl:rotate-180' />
            <BreadcrumbItem>
              <BreadcrumbPage>إنشاء مستخدم</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CreateUserForm />
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
