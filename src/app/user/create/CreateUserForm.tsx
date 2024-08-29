'use client';
import { createUser } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function CreateUserForm() {
  const [state, action] = useFormState(createUser, { error: '' });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      action={action}
      className='grid grid-cols-1 gap-8 min-w-[450px] rounded-md shadow-md border border-t-4 border-t-tu-primary p-8'
    >
      <div className='flex flex-col gap-2'>
        <div className='text-2xl font-medium'>إنشاء مستخدم</div>
        <div className='text-sm text-muted-foreground'>
          إنشاء مستخدم لتمكينه من تسجيل فعاليات.
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='username'>اسم المستخدم</Label>
        <Input
          dir='ltr'
          autoComplete='off'
          className='text-end'
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
            className='text-end'
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
      <div className='flex flex-col gap-4'>
        <Label htmlFor='confirmPassword'>تأكيد كلمة المرور</Label>
        <Input
          dir='ltr'
          className='text-end'
          name='confirmPassword'
          type={showPassword ? 'text' : 'password'}
        />
      </div>
      <Button>إنشاء</Button>
      {state.error && (
        <div className='text-center text-destructive text-xs font-bold'>
          {state.error}
        </div>
      )}
      {state.message && (
        <div className='text-green-600 text-xs font-bold flex items-center gap-2 justify-center'>
          <Check className='w-4 h-4' />
          {state.message}
        </div>
      )}
    </form>
  );
}
