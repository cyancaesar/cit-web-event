'use client';
import { signIn } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [state, action] = useFormState(signIn, { error: '' });

  return (
    <form
      action={action}
      className='grid grid-cols-1 gap-8 min-w-[450px] rounded-md shadow-md border p-8'
    >
      <div className='text-2xl font-medium'>تسجيل دخول</div>
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
        <Label>كلمة المرور</Label>
        <Input dir='ltr' className='text-end' name='password' type='password' />
      </div>
      <Button>دخول</Button>
      <div className='text-center text-destructive text-xs font-bold'>
        {state.error}
      </div>
    </form>
  );
}
