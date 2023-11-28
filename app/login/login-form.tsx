'use client';

import EmailIcon from '@/assets/images/icon-email.svg';
import PasswordIcon from '@/assets/images/icon-password.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Can't be empty",
  }),
  password: z.string().min(2, {
    message: 'Please check again',
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className='mb-10 flex flex-col gap-2'>
        <h1 className='font-bold text-2xl'>Login</h1>
        <p className='text-secondary'>
          Add your details below to get back into the app
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6 mb-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel>Email address</FormLabel>
                <FormControl className='py-3'>
                  <Input
                    className='pl-11'
                    placeholder='e.g. alex@email.com'
                    {...field}
                  />
                </FormControl>
                <Image
                  className='absolute bottom-3 left-4'
                  src={EmailIcon}
                  width={16}
                  height={16}
                  alt=''
                />
                <FormMessage className='absolute bottom-3 right-4 text-xs' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='relative'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className='pl-11'
                    placeholder='Enter your Password'
                    {...field}
                  />
                </FormControl>
                <Image
                  className='absolute bottom-3 left-4'
                  src={PasswordIcon}
                  width={16}
                  height={16}
                  alt=''
                />
                <FormMessage className='absolute bottom-3 right-4 text-xs' />
              </FormItem>
            )}
          />
          <Button className='w-full rounded-sm font-bold' type='submit'>
            Login
          </Button>
        </form>
      </Form>
      <div className='text-center'>
        <p className='text-secondary'>Don't have an account?</p>
        <Link className='text-primary' href={'/create-account'}>
          Create Account
        </Link>
      </div>
    </div>
  );
}
