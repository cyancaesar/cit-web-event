import { unstable_noStore as noStore } from 'next/cache';

import Image from 'next/image';
import EventTable from './EventTable';
import { columns } from './event-columns';
import prisma from '@/lib/db';

export default async function Events() {
  noStore();
  const events = await prisma.event.findMany();

  return (
    <main className='min-h-screen flex relative flex-col gap-4'>
      <div
        className='h-40 relative border-b-4 border-b-tu-primary flex items-center justify-between px-12'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      >
        <h1 className='text-4xl font-medium text-tu-primary'>
          الفعاليات المسجلة
        </h1>
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
