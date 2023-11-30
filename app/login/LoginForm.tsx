'use client';

import EmailIcon from '@/assets/images/icon-email.svg';
import PasswordIcon from '@/assets/images/icon-password.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type FormErrors = {
  email: string;
  password: string;
};

type FormData = {
  email: string;
  password: string;
};

export function LoginForm({
  onSubmit,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
}) {
  // Local State
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  // Dynamic Classes for Label and Input fields
  const labelClass = (errorKey: keyof FormErrors) =>
    `text-xs ${errors[errorKey] ? 'text-destructive' : ''}`;

  const inputClass = (errorKey: keyof FormErrors) =>
    `pl-11 mt-1 bg-white focus:drop-shadow-[0_0_32px_rgba(99,60,255,0.25)] ${
      errors[errorKey] ? 'border-destructive' : ''
    }`;

  // Functions
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors: FormErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      newErrors.email = "Can't be empty";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Please check again';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      onSubmit({ email: formData.email, password: formData.password });
    }
  };

  return (
    <div className='flex flex-col justify-center md:bg-white md:p-10 md:w-[476px] md:mx-auto md:rounded-lg lg:w-[482px]'>
      <div className='mb-10 flex flex-col gap-2'>
        <h1 className='font-bold text-2xl md:text-[32px]'>Login</h1>
        <p className='text-secondary'>
          add your details below to get back into the app
        </p>
      </div>
      <form className='flex flex-col gap-6 mb-6' onSubmit={handleSubmit}>
        <div className='relative'>
          <Label htmlFor='email' className={labelClass('email')}>
            Email address
          </Label>
          <Input
            name='email'
            onChange={handleInputChange}
            type='email'
            className={inputClass('email')}
            placeholder='e.g. alex@email.com'
            autoComplete='email'
          />
          <Image
            className='absolute bottom-3 left-4'
            src={EmailIcon}
            width={16}
            height={16}
            alt=''
          />
          {errors.email && (
            <div className='text-destructive absolute right-4 bottom-3 text-xs'>
              {errors.email}
            </div>
          )}
        </div>
        <div className='relative'>
          <Label htmlFor='password' className={labelClass('password')}>
            Password
          </Label>
          <Input
            name='password'
            onChange={handleInputChange}
            type='password'
            className={inputClass('password')}
            placeholder='Enter your password'
            autoComplete='new-password'
          />
          <Image
            className='absolute bottom-3 left-4'
            src={PasswordIcon}
            width={16}
            height={16}
            alt=''
          />
          {errors.password && (
            <div className='text-destructive absolute right-4 bottom-3 text-xs'>
              {errors.password}
            </div>
          )}
        </div>

        <Button
          className='w-full text-base rounded-sm font-semibold'
          type='submit'>
          Login
        </Button>
      </form>
      <div className='text-center'>
        <span className='text-secondary'>Don't have an account? </span>
        <Link className='text-primary' href={'/create-account'}>
          Create account
        </Link>
      </div>
    </div>
  );
}
