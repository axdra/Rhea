import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout';
import '../styles/globals.css';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Head>
          <meta name="apple-mobile-web-app-status-bar" content="#fff" />
          <link rel="apple-touch-icon" href="/images/icons/192.png" />
          <meta name="theme-color" content="#fff" />

          <link rel="manifest" href="/manifest.json" />
        </Head>

        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}

export default appWithTranslation(MyApp);
