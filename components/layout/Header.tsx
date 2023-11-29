'use client';

import PreviewIcon from '@/assets/images/icon-preview-header.svg';
import LogoLarge from '@/assets/images/logo-devlinks-large.svg';
import LogoSmall from '@/assets/images/logo-devlinks-small.svg';
import { CircleUserRound, LinkIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className='flex bg-white p-4 rounded-b-lg justify-between items-center md:rounded-lg md:m-6 lg:max-w-[1392px] lg:mx-auto'>
      <Link href={'/'}>
        <Image
          alt='dev links logo'
          className='md:hidden'
          src={LogoSmall}
          width={32}
          height={32}></Image>
        <Image
          alt='dev links logo'
          className='hidden md:block'
          src={LogoLarge}
          width={146}
          height={32}></Image>
      </Link>
      <div className='flex items-center'>
        <Link href='/'>
          <div
            className={`group md:flex md:items-center md:gap-2 ${
              isActive('/') ? 'bg-primary-muted' : 'bg-transparent'
            } py-[11px] px-[27px] rounded-sm`}>
            <LinkIcon
              size={20}
              className={`group-hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-secondary'
              } transition-all duration-300`}
            />
            <p
              className={`group-hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-secondary'
              } hidden md:block font-semibold transition-all duration-300`}>
              Links
            </p>
          </div>
        </Link>
        <Link href='/profile'>
          <div
            className={`group md:flex md:items-center md:gap-2 ${
              isActive('/profile') ? 'bg-primary-muted' : 'bg-transparent'
            } py-[11px] px-[27px] rounded-sm`}>
            <CircleUserRound
              size={20}
              className={`group-hover:text-primary ${
                isActive('/profile') ? 'text-primary' : 'text-secondary'
              } transition-all duration-300`}
            />
            <p
              className={`group-hover:text-primary ${
                isActive('/profile') ? 'text-primary' : 'text-secondary'
              } hidden md:block font-semibold transition-all duration-300`}>
              Profile Details
            </p>
          </div>
        </Link>
      </div>
      <Link
        href={'/preview'}
        className='border border-primary rounded-sm px-4 py-[11px] md:px-[27px] hover:bg-primary-muted transition-all duration-300'>
        <Image
          alt=''
          className='md:hidden'
          src={PreviewIcon}
          width={20}
          height={20}></Image>
        <p className='hidden md:block text-primary font-semibold'>Preview</p>
      </Link>
    </nav>
  );
};
