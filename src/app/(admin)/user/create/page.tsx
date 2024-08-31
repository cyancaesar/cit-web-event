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
import Sidebar from '@/components/Sidebar';

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
      <Sidebar />
    </main>
  );
}
