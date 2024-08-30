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
import { format } from 'date-fns';
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

export default async function ManageUser() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;

  const users = await prisma.user.findMany({
    include: { sessions: true },
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, key) => (
                    <TableRow
                      className='even:bg-muted even:hover:bg-muted hover:bg-transparent'
                      key={key}
                    >
                      <TableCell className='text-center'>
                        {user.username}
                      </TableCell>
                      <TableCell className='text-center'>0</TableCell>
                      <TableCell dir='ltr' className='text-center'>
                        {user.sessions.length > 0
                          ? format(
                              user.sessions.at(-1)?.createdAt!,
                              'yyyy/MM/dd, hh:MM:s a'
                            )
                          : 'لم يسجل دخوله'}
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
