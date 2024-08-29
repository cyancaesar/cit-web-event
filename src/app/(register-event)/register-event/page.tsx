import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import RegisterEventForm from './RegisterEventForm';
import Image from 'next/image';
import Unauthorized from '@/components/Unauthorized';
import { validateRequest } from '@/auth';

export default async function RegisterEvent() {
  const { user } = await validateRequest();
  if (!user) return <Unauthorized />;

  return (
    <main className='min-h-screen flex relative'>
      <div className=' z-20 mx-auto py-8'>
        <Card className='z-20 min-w-[800px] border-t-4 border-t-tu-primary'>
          <div className='flex justify-between'>
            <CardHeader className='space-y-2.5'>
              <CardTitle className='font-medium text-tu-primary'>
                تسجيل فعالية
              </CardTitle>
              <CardDescription>الرجاء تعبئة النموذج أدناه</CardDescription>
            </CardHeader>
            <div className='relative w-32 p-4 flex justify-center items-center'>
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
          <Separator className='bg-tu-primary' />
          <CardContent>
            <RegisterEventForm />
          </CardContent>
        </Card>
      </div>

      <div
        className='absolute w-full h-full'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      ></div>
    </main>
  );
}
