import Logo from '@/assets/images/logo-devlinks-large.svg';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderAuth = () => {
  return (
    <header className='mb-16 max-w-[182.5px] md:mx-auto mt-8 md:mt-0'>
      <Link href={'/'}>
        <Image
          src={Logo}
          width={182.5}
          height={40}
          alt='dev links logo'></Image>
      </Link>
    </header>
  );
};
