import { HeaderAuth } from '@/components/layout/HeaderAuth';
import { createClient } from '@/utils/supabase/server';
import { cookies, headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import * as z from 'zod';
import { SignupForm } from './SignUpForm';

export default function CreateAccount({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (data: { email: string; password: string }) => {
    'use server';

    const origin = headers().get('origin');
    const email = data.email;
    const password = data.password;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log('signup error', error);
    }

    return redirect('/login');
  };

  return (
    <div className='flex-1 flex flex-col w-full container bg-background md:justify-center'>
      <HeaderAuth />
      <SignupForm onSubmit={signUp} />
    </div>
  );
}
