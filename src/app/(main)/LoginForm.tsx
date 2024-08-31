'use client';
import { signIn } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, KeyRound, User } from 'lucide-react';
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
      <div className='text-2xl font-medium'>تسجيل الدخول</div>
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
      <Button>دخول</Button>
      <div className='text-center text-destructive text-xs font-bold'>
        {state.error}
      </div>
    </form>
  );
}
