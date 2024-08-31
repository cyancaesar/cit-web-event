import { validateRequest } from '@/auth';
import ExportReport from './ExportReport';
import Unauthorized from '@/components/Unauthorized';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getYear } from 'date-fns';
import Sidebar from '@/components/Sidebar';

export default async function Report() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;

  const dates = await prisma.event.findMany({ select: { date_from: true } });
  const years = dates
    .map((date) => getYear(date.date_from))
    .filter((year, index, years) => years.indexOf(year) === index);

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
              <BreadcrumbPage>إصدار التقارير</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ExportReport years={years} />
        <div></div>
      </div>
      <Sidebar />
    </main>
  );
}
