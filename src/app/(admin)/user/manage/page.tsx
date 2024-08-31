import Image from 'next/image';
import { validateRequest } from '@/auth';
import Unauthorized from '@/components/Unauthorized';
import prisma from '@/lib/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, isToday } from 'date-fns';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CircleCheck, CircleX } from 'lucide-react';

import ManagePopover from './ManagePopover';
import Sidebar from '@/components/Sidebar';

function formatDate(date: Date) {
  if (isToday(date)) return format(date, 'hh:mm a');
  return format(date, 'yyyy/MM/dd, hh:mm a');
}

export default async function ManageUser() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;

  const users = await prisma.user.findMany({
    include: { logs: true },
  });

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
              <BreadcrumbPage>إدارة المستخدمين</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='w-full relative h-[350px]'>
          <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
            <ScrollArea dir='rtl' className='w-full h-full rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow className='[&>*]:text-center [&>*]:text-black [&>*]:font-bold hover:bg-tu-primary bg-tu-primary'>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>عدد الفعاليات المسجلة</TableHead>
                    <TableHead>اخر تسجيل دخول</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, key) => (
                    <TableRow className=' hover:bg-transparent' key={key}>
                      <TableCell className='text-center'>
                        {user.username}
                      </TableCell>
                      <TableCell className='text-center'>0</TableCell>
                      <TableCell dir='ltr' className='text-center'>
                        {user.logs.length > 0
                          ? formatDate(user.logs.at(-1)?.createdAt!)
                          : 'لم يسجل دخوله'}
                      </TableCell>
                      <TableCell dir='ltr' className='text-center'>
                        {!user.isDisabled ? (
                          <CircleCheck className='h-4 w-4 text-green-600 mx-auto' />
                        ) : (
                          <CircleX className='h-4 w-4 text-red-700 mx-auto' />
                        )}
                      </TableCell>
                      <TableCell className='w-min'>
                        <ManagePopover
                          id={user.id}
                          username={user.username}
                          isDisabled={user.isDisabled}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
        <div></div>
      </div>
      <Sidebar />
    </main>
  );
}
