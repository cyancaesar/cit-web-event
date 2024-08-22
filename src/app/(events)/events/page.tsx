import Image from 'next/image';
import EventTable from './EventTable';
import { columns } from './event-columns';
import prisma from '@/lib/db';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function Events() {
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
        {/* <div className='px-4 absolute top-0 left-0 w-full h-full'> */}
        {/* <ScrollArea dir='rtl' className='w-full h-full'> */}
        <EventTable columns={columns} data={events} />
        {/* </ScrollArea> */}
        {/* </div> */}
      </div>
    </main>
  );
}
