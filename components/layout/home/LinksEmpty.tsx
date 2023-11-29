import LinksEmptyImage from '@/assets/images/illustration-empty.svg';
import Image from 'next/image';

const LinksEmpty = () => {
  return (
    <div className='text-center bg-background px-5 md:px-[76.5px] py-[46.5px] md:py-[82.5px] rounded-lg mb-6 md:mb-10 lg:px-30'>
      <>
        <Image
          className='mx-auto mb-6 max-w-[124.77px] md:max-w-[249.53px]'
          src={LinksEmptyImage}
          width={249.53}
          height={160}
          alt=''
        />
        <h2 className='font-bold text-2xl mb-6 md:text-[32px]'>
          Let's get you started
        </h2>
        <p className='text-secondary'>
          Use the "Add new link" button to get started. Once you have more than
          one link, you can reorder and edit them. We're here to help you share
          your profiles with everyone!
        </p>
      </>
    </div>
  );
};

export default LinksEmpty;
