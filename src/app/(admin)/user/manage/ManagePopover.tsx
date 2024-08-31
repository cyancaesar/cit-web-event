'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Eye,
  EyeOff,
  MoreHorizontal,
  UserCheck,
  UserMinus,
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { changePassword, disableUser, enableUser } from '@/action/user';
import { useState } from 'react';

type Props = {
  id: string;
  username: string;
  isDisabled: boolean;
};
export default function ManagePopover({ id, username, isDisabled }: Props) {
  const [type, setType] = useState<'CHANGE_PASSWORD' | 'DISABLE_USER' | null>(
    null
  );
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleChangePassword(formData: FormData) {
    setType('CHANGE_PASSWORD');
    setError('');
    setMessage('');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const result = await changePassword(id, { password, confirmPassword });

    if (result.error) setError(result.error);
    else if (result.message) setMessage(result.message);
  }

  return (
    <Popover
      onOpenChange={() => {
        setError('');
        setMessage('');
        setType(null);
      }}
    >
      <PopoverTrigger asChild>
        <div className='flex justify-center'>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[400px]'>
        <div className='grid gap-8'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>
              <span>إدارة المستخدم {username}</span>
            </h4>
            <p className='text-sm text-muted-foreground'>
              يمكنك تعطيل المستخدم أو تغيير كلمة المرور
            </p>
          </div>
          <div className='border p-4 rounded-md relative'>
            <div className='text-sm absolute -top-3.5 bg-white'>
              تغيير كلمة المرور
            </div>
            <form action={handleChangePassword}>
              <div className='grid gap-2'>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='width' className='text-xs'>
                    كلمة المرور
                  </Label>
                  <div className='relative col-span-2 '>
                    <Input
                      dir='ltr'
                      name='password'
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      className='h-8 text-end pl-10'
                    />
                    <Button
                      type='button'
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='absolute top-0 left-0 h-8'
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
                <div className='grid grid-cols-3 items-center gap-4'>
                  <Label htmlFor='confirmPassword' className='text-xs'>
                    تأكيد كلمة المرور
                  </Label>
                  <Input
                    dir='ltr'
                    name='confirmPassword'
                    id='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    className='col-span-2 h-8 text-end'
                  />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <div></div>
                  <div className='col-span-2'>
                    <Button
                      type='submit'
                      className='w-full h-8 text-xs'
                      size='sm'
                    >
                      تغيير
                    </Button>
                  </div>
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <div></div>
                  <div className='col-span-2'>
                    {type == 'CHANGE_PASSWORD' && error && (
                      <span className='text-destructive font-medium text-xs'>
                        {error}
                      </span>
                    )}
                    {type == 'CHANGE_PASSWORD' && message && (
                      <span className='text-green-600 font-medium text-xs'>
                        {message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='border p-4 rounded-md relative'>
            <div className='text-sm absolute -top-3.5 bg-white'>
              حالة المستخدم
            </div>
            <div className='grid gap-2'>
              <div className='grid grid-cols-3 items-center gap-4'>
                <div>
                  {isDisabled ? (
                    <div className='flex items-center gap-2'>
                      <UserMinus className='w-4 h-4 text-red-700' />
                      <span className='text-sm'>معطل</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <UserCheck className='w-4 h-4 text-green-600' />
                      <span className='text-sm'>مفعل</span>
                    </div>
                  )}
                </div>
                <div className='col-span-2'>
                  {isDisabled ? (
                    <div className='flex items-center gap-2'>
                      <Button
                        onClick={async () => {
                          setType('DISABLE_USER');
                          const result = await enableUser(id);
                          if (result.error) setError(result.error);
                          else if (result.message) setMessage(result.message);
                        }}
                        className='w-full h-8 text-xs'
                        size='sm'
                        variant='outline'
                      >
                        تفعيل
                      </Button>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Button
                        onClick={async () => {
                          setType('DISABLE_USER');
                          const result = await disableUser(id);
                          if (result.error) setError(result.error);
                          else if (result.message) setMessage(result.message);
                        }}
                        className='w-full h-8 text-xs'
                        size='sm'
                        variant='outline'
                      >
                        تعطيل
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <div></div>
                <div className='col-span-2'>
                  {type == 'DISABLE_USER' && error && (
                    <span className='text-destructive font-medium text-xs'>
                      {error}
                    </span>
                  )}
                  {type == 'DISABLE_USER' && message && (
                    <span className='text-green-600 font-medium text-xs'>
                      {message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
