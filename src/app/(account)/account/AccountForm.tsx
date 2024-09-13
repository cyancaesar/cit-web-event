'use client';
import { addEmail, changeEmail } from '@/action/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns-tz';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitAddEmail() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type='submit'
      variant='outline'
      className='rounded-r-none focus-visible:ring-offset-0 focus-visible:z-40'
    >
      {pending ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'إضافة'}
    </Button>
  );
}

function SubmitChangeEmail() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type='submit'
      variant='outline'
      className='rounded-r-none focus-visible:ring-offset-0 focus-visible:z-40'
    >
      {pending ? <LoaderCircle className='animate-spin h-4 w-4' /> : 'تغيير'}
    </Button>
  );
}

type Props = {
  id: string;
  username: string;
  email: string | null;
  emailVerifiedAt: Date | null;
};

export default function AccountForm({
  id,
  username,
  email,
  emailVerifiedAt,
}: Props) {
  const [addEmailState, addEmailAction] = useFormState(addEmail, {
    error: '',
    message: '',
  });

  const [changeEmailState, changeEmailAction] = useFormState(changeEmail, {
    error: '',
    message: '',
  });

  return (
    <div className='grid grid-cols-1 gap-8 min-w-[350px] lg:min-w-[450px] rounded-md shadow-md border border-t-4 border-t-tu-primary p-8'>
      <div className='text-2xl font-medium'>بيانات الحساب</div>
      <div className='flex flex-col gap-4'>
        <Label>اسم المستخدم</Label>
        <Input
          autoComplete='off'
          dir='ltr'
          className='w-full text-end'
          readOnly
          value={username}
          disabled
          type='text'
        />
      </div>
      {!email && (
        <form action={addEmailAction}>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='email'>
              البريد الإلكتروني
              <span className='text-muted-foreground text-xs mr-2'>
                {!email && 'أضف بريد إلكتروني'}
              </span>
            </Label>
            <div className='flex'>
              <Input
                autoComplete='off'
                dir='ltr'
                className='w-full text-end rounded-l-none border-l-0 focus-visible:ring-offset-0 focus-visible:z-40'
                placeholder='بريدك الإلكتروني'
                name='email'
                id='email'
                type='text'
              />
              <SubmitAddEmail />
            </div>
            {addEmailState.error && (
              <span className='text-xs font-medium text-destructive'>
                {addEmailState.error}
              </span>
            )}
            {addEmailState.message && (
              <span className='text-xs font-medium text-green-600'>
                {addEmailState.message}
              </span>
            )}
          </div>
        </form>
      )}
      {email && (
        <form action={changeEmailAction}>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='changeEmail'>البريد الإلكتروني</Label>
            <div className='flex'>
              <Input
                autoComplete='off'
                dir='ltr'
                className='w-full text-end rounded-l-none border-l-0 focus-visible:ring-offset-0 focus-visible:z-40'
                placeholder='بريدك الإلكتروني'
                name='changeEmail'
                id='changeEmail'
                defaultValue={email}
                type='text'
              />
              <SubmitChangeEmail />
            </div>
            {emailVerifiedAt ? (
              <span className='text-xs font-medium flex items-center'>
                <CheckCircle2 className='w-4 h-4 ml-2' />
                تم التحقق من البريد في{' '}
                <span dir='ltr'>
                  {format(emailVerifiedAt, 'yyyy/MM/dd', {
                    timeZone: 'Asia/Riyadh',
                  })}
                </span>
              </span>
            ) : (
              <span className='text-xs font-medium'>البريد غير موثق</span>
            )}
            {changeEmailState.error && (
              <span className='text-xs font-medium text-destructive'>
                {changeEmailState.error}
              </span>
            )}
            {changeEmailState.message && (
              <span className='text-xs font-medium text-green-600'>
                {changeEmailState.message}
              </span>
            )}
          </div>
        </form>
      )}
      <Separator />
      <Button variant='outline' asChild>
        <Link href='/'>العودة للصفحة الرئيسية</Link>
      </Button>
    </div>
  );
}
