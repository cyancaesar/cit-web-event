'use client';
import { signIn } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [state, action] = useFormState(signIn, { error: '' });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={action}
      className='grid grid-cols-1 gap-8 min-w-[450px] rounded-md shadow-md border border-t-4 border-t-tu-primary p-8'
    >
      <div className='text-2xl font-medium'>تسجيل دخول</div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='username'>إسم المستخدم</Label>
        <Input
          autoComplete='off'
          dir='ltr'
          className='w-full text-end'
          name='username'
          id='username'
          type='text'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='password'>كلمة المرور</Label>
        <div className='relative'>
          <Input
            dir='ltr'
            className='pl-12 text-end'
            name='password'
            type={showPassword ? 'text' : 'password'}
          />
          <Button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute top-0 left-0'
            variant='ghost'
            size='icon'
          >
            {showPassword ? (
              <EyeOff className='w-5 h-5' />
            ) : (
              <Eye className='w-5 h-5' />
            )}
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Button type='submit'>دخول</Button>
        <Button variant='ghost' asChild>
          <Link href='/password-reset'>إعادة تعيين كلمة المرور</Link>
        </Button>
      </div>
      {state.error && (
        <div className='text-center text-destructive text-xs font-bold'>
          {state.error}
        </div>
      )}
    </form>
  );
}
