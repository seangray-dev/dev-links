'use client';

import { useLinks } from '@/app/contexts/LinksContext';
import PhoneMockup from '@/assets/images/illustration-phone-mockup.svg';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { FormEvent } from 'react';
import LinksEmpty from './LinksEmpty';
import { SelectLinkItem } from './SelectLinkItem';

export const Links = () => {
  const { linkItems, addLinkItem } = useLinks();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Format Link Items to only contain necessary data for supabase
    const formattedLinkItems = linkItems.map(({ id, platform, url }) => ({
      id,
      platform,
      url,
    }));

    event.preventDefault();

    // Check for errors in each link item
    let isValid = true;
    for (const item of linkItems) {
      if (item.platformError || item.urlError) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      try {
        // Example: await submitLinksToAPI(linkItems);
        console.log('Submitting links:', formattedLinkItems);
      } catch (error) {
        console.error('Error submitting links:', error);
      }
    } else {
      console.error('Validation failed');
    }
  };

  return (
    <div className='lg:grid lg:grid-cols-2 lg:gap-6 lg:max-w-[1392px] lg:h-full lg:items-center lg:justify-center lg:mx-auto'>
      <div className='hidden bg-white lg:flex lg:flex-col lg:flex-1 lg:justify-center lg:items-center rounded-lg lg:h-full lg:w-full'>
        <Image src={PhoneMockup} width={307} height={631} alt='' />
      </div>
      <form
        onSubmit={handleSubmit}
        className='mt-4 md:mt-0 bg-white p-6 max-w-[343px] mx-auto rounded-lg md:max-w-[721px] lg:w-full lg:flex lg:flex-col lg:justify-center'>
        <div className='mb-6'>
          <h1 className='font-bold text-2xl mb-2'>Customize your links</h1>
          <p className='text-secondary mb-10'>
            Add/edit/remove links below and then share all your profile with the
            world!
          </p>
          <Button
            type='button'
            onClick={addLinkItem}
            className='w-full font-semibold bg-transparent text-primary border border-primary hover:bg-primary-muted transition-all duration-300 rounded-sm'>
            {' '}
            + Add new link
          </Button>
        </div>
        {linkItems.length === 0 ? (
          <LinksEmpty />
        ) : (
          <div className='flex flex-col gap-6'>
            {linkItems.map((item, index) => (
              <SelectLinkItem key={item.id} id={item.id} index={index} />
            ))}
          </div>
        )}
        <Separator className='w-full mb-4 md:mb-6' />
        <div className='flex md:justify-end'>
          <Button type='submit' disabled={linkItems.length === 0}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
