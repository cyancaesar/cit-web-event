import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='min-h-screen grid place-content-center'>
      <div className='z-10 p-8 flex flex-col justify-center gap-8 items-center'>
        <div className='text-4xl flex items-center gap-4 text-tu-primary font-bold'>
          <span className='text-tu-secondary'>404</span>
          <Separator orientation='vertical' /> الصفحة غير موجودة
        </div>
        <Button className='mt-4' asChild>
          <Link href='/'>العودة للصفحة الرئيسية</Link>
        </Button>
      </div>
    </main>
  );
}
