'use server';

import { signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
    });
    return redirect('/dashboard');
  } catch (error: any) {
    if (isRedirectError(error)) {
      redirect('/');
    }
  } finally {
    redirect('/');
  }
}
