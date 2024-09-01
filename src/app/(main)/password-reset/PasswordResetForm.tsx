'use client';
import { resetPasswordRequest } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type='submit'>
      {pending ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'إرسال'}
    </Button>
  );
}

export default function PasswordResetForm() {
  const [state, action] = useFormState(resetPasswordRequest, {
    error: '',
    message: '',
  });

  return (
    <form
      action={action}
      className='grid grid-cols-1 gap-8 min-w-[450px] rounded-md shadow-md border border-t-4 border-t-tu-primary p-8'
    >
      <div className='text-2xl font-medium'>تغيير كلمة المرور</div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='email'>البريد الإلكتروني</Label>
        <Input
          autoComplete='off'
          dir='ltr'
          className='w-full text-end'
          name='email'
          id='email'
          type='text'
        />
        <span className='text-xs text-muted-foreground'>
          يتم إرسال رابط تغيير كلمة المرور عند وجود حساب مربوط بالبريد
          الإلكتروني.
        </span>
      </div>
      <div className='flex flex-col gap-2'>
        <Submit />
        <Button variant='ghost' asChild>
          <Link href='/'>الرجوع للصفحة الرئيسية</Link>
        </Button>
      </div>
      {state.error && (
        <div className='text-center text-destructive text-xs font-bold'>
          {state.error}
        </div>
      )}

      {state.message && (
        <div className='text-center text-green-600 text-xs font-bold'>
          {state.message}
        </div>
      )}
    </form>
  );
}
