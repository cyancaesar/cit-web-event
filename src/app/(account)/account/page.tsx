import { validateRequest } from '@/auth';
import Sidebar from '@/components/Sidebar';
import Unauthorized from '@/components/Unauthorized';
import AccountForm from './AccountForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function Acount() {
  const { user } = await validateRequest();

  if (!user) return <Unauthorized />;

  return (
    <main className='w-full flex lg:grid lg:grid-cols-2 min-h-screen'>
      <div className='flex flex-col grow items-center justify-between rtl:lg:border-l-4 py-12 px-8 ltr:lg:border-r-4 border-tu-primary'>
        <Breadcrumb className='self-start'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='rtl:rotate-180' />
            <BreadcrumbItem>
              <BreadcrumbPage>بيانات الحساب</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <>
          <div className='space-y-8'>
            <div className='gap-2 text-center hidden'>
              <h1 className='text-3xl font-medium flex items-center gap-2 tracking-tight justify-center'>
                منصة الفعاليات والأنشطة الطلابية
              </h1>
            </div>
            <AccountForm
              id={user.id}
              username={user.username}
              email={user.email}
              emailVerifiedAt={user.emailVerifiedAt}
            />
          </div>
        </>
        <div></div>
      </div>
      <Sidebar />
    </main>
  );
}
