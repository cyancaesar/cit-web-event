import { Hand } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className='min-h-screen grid place-content-center'>
      <div className='flex gap-4'>
        <Hand className='w-12 h-12' />
        <div className='text-4xl'>توقف! أنت غير موثق</div>
      </div>
      <Button variant='outline' className='mt-8' asChild>
        <Link href='/'>الرجوع للصفحة الرئيسية</Link>
      </Button>
    </div>
  );
}
