import { HeaderAuth } from '@/components/layout/HeaderAuth';
import { createClient } from '@/utils/supabase/server';
import { sign } from 'crypto';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (data: { email: string; password: string }) => {
    'use server';

    const email = data.email;
    const password = data.password;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/');
  };

  return (
    <div className='flex-1 flex flex-col w-full container bg-background md:justify-center'>
      <HeaderAuth />
      <LoginForm onSubmit={signIn} />
    </div>
  );
}
