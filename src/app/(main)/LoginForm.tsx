'use client';
import { authenticate } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

export default function LoginForm() {
  const handleSubmit = async (formData: FormData) => {
    try {
      await authenticate(formData);
    } catch (e) {
      alert('User not found');
    }
  };

  return (
    <form
      action={(data) => handleSubmit(data)}
      className='grid grid-cols-1 gap-8 min-w-[450px] rounded-md shadow-md border p-8'
    >
      <div className='text-2xl font-medium'>تسجيل دخول</div>
      <div className='flex flex-col gap-4'>
        <Label>اسم المستخدم</Label>
        <Input
          autoComplete='off'
          className='text-center'
          name='username'
          type='text'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Label>كلمة المرور</Label>
        <Input className='text-center' name='password' type='password' />
      </div>
      <Button>دخول</Button>
    </form>
  );
}
