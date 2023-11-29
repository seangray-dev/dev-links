'use client';

import { Header } from '@/components/layout/Header';
import { Links } from '@/components/layout/home/Links';
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { LinksProvider } from './contexts/LinksContext';

export default async function Index() {
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const user = await supabase.auth.getUser();

      if (!user) {
        redirect('/login');
      }
    };

    checkAuth();
  }, []);

  return (
    <div className='w-full'>
      <LinksProvider>
        <Header />
        <Links />
      </LinksProvider>
    </div>
  );
}
