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

export default function RegisterEvent() {
  return (
    <main className='min-h-screen flex relative'>
      <div className=' z-20 mx-auto py-8'>
        <Card className='z-20 min-w-[800px]'>
          <CardHeader className='space-y-2.5'>
            <CardTitle className='font-medium text-tu-primary'>
              تسجيل فعالية
            </CardTitle>
            <CardDescription>الرجاء تعبئة النموذج أدناه</CardDescription>
          </CardHeader>
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
