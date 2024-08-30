import Image from 'next/image';
import EventTable from './EventTable';
import { columns } from './event-columns';
import prisma from '@/lib/db';
import Unauthorized from '@/components/Unauthorized';
import { validateRequest } from '@/auth';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function Events() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;
  const events = await prisma.event.findMany({
    include: { user: { select: { username: true } } },
  });

  return (
    <main className='min-h-screen flex relative flex-col gap-4'>
      <div
        className='h-40 relative border-b-4 border-b-tu-primary flex items-center justify-between px-8'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='rtl:rotate-180' />
            <BreadcrumbItem>
              <BreadcrumbPage>الفعاليات المسجلة</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='relative w-40 p-4 flex justify-center items-center'>
          <Image
            src='/assets/logo.png'
            alt='TU logo'
            sizes='100vw'
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className='px-4'>
        {/* <Card className='p-8 flex items-center border-tu-primary'> */}
        {/* <div className='font-bold'>تحديد الفترة</div> */}
        {/* </Card> */}
      </div>
      <div className='flex grow flex-col relative'>
        <EventTable columns={columns} data={events} />
      </div>
    </main>
  );
}
