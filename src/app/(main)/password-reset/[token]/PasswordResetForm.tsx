'use client';
import { resetPassword } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, isAfter } from 'date-fns';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

type Props = {
  username: string;
  token: string;
  expiresAt: Date;
};
export default function PasswordResetForm({
  username,
  token,
  expiresAt,
}: Props) {
  const [state, action] = useFormState(resetPassword, {
    error: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [expire, setExpire] = useState('00:00');
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAfter(new Date(), expiresAt)) {
        router.refresh();
      } else {
        const delta = expiresAt.getTime() - new Date().getTime();
        setExpire(format(delta, 'mm:ss'));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expire]);

  return (
    <form
      action={action}
      className='grid grid-cols-1 gap-8 min-w-[450px] rounded-md shadow-md border border-t-4 border-t-tu-primary p-8'
    >
      <div>
        <div className='text-2xl font-medium'>
          تغيير كلمة مرور للمستخدم {username}
        </div>
        <span className='text-xs text-muted-foreground'>
          تنتهي صلاحية الرابط خلال <span dir='ltr'>{expire}</span>
        </span>
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='password'>كلمة المرور الجديدة</Label>
        <div className='relative'>
          <Input
            autoComplete='off'
            dir='ltr'
            className='w-full text-end pl-12'
            name='password'
            id='password'
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
        <Label htmlFor='confirmPassword'>تأكيد كلمة المرور الجديدة</Label>
        <div className='relative'>
          <Input
            autoComplete='off'
            dir='ltr'
            className='w-full text-end pl-12'
            name='confirmPassword'
            id='confirmPassword'
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
      <input type='text' value={token} name='token' readOnly hidden />
      <div className='flex flex-col gap-2'>
        <Button type='submit'>تأكيد</Button>
        <Button variant='ghost' asChild>
          <Link href='/'>العودة للصفحة الرئيسية</Link>
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
